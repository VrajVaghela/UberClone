const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/map.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');
const userModel = require('../models/user.model'); 

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        // Get both coordinates first
        const [pickupCoordinates, destinationCoordinates] = await Promise.all([
            mapService.getAddressCoordinate(pickup),
            mapService.getAddressCoordinate(destination)
        ]);

        console.log('Coordinates:', { pickup: pickupCoordinates, destination: destinationCoordinates });

        // Validate pickup coordinates
        if (!pickupCoordinates || !pickupCoordinates.lng) {
            return res.status(400).json({
                message: 'Failed to get pickup coordinates',
                details: 'Could not geocode pickup address',
                address: pickup
            });
        }

        const ltd = pickupCoordinates.ltd;
        const lng = pickupCoordinates.lng;

        // Search radius in kilometers
        const searchRadius = 5;
        const captainsInRadius = await mapService.getCaptainsInTheRadius(ltd, lng, searchRadius);
        console.log(captainsInRadius);

        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            pickupCoordinates: { ltd, lng },
            destination,
            destinationCoordinates,
            vehicleType
        });

        // Populate user data and notify captains before sending response
        const rideWithUser = await rideModel.findOne({_id: ride._id})
            .populate('user')
            .select('+otp'); // Include OTP in response

        // Only remove OTP from captain notifications
        const rideForCaptains = { 
            ...rideWithUser.toObject(),
            otp: undefined 
        };

        // Notify captains without OTP
        for (const captain of captainsInRadius) {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideForCaptains
            });
        }

        // Send response with OTP to user
        return res.status(201).json({ ride: rideWithUser });

    } catch (err) {
        console.error('Ride creation error:', err);
        return res.status(500).json({ message: err.message });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fares = await rideService.getFare(pickup, destination);
        return res.status(200).json(fares);
    } catch (err) {
        console.error("Error calculating fares:", err);
        return res.status(500).json({ message: "Failed to calculate fare estimates" });
    }
};

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {rideId} = req.body;

    try{
        const ride = await rideService.confirmRide({
            rideId,
            captain: req.captain // Use the authenticated captain from middleware
        });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });

        return res.status(200).json(ride);
    }catch(err){
        console.error('Confirm ride error:', err);
        return res.status(500).json({message: err.message});
    }
}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {rideId, otp} = req.body;  // Changed from req.query to req.body

    if (!rideId || !otp) {
        return res.status(400).json({
            message: 'Ride ID and OTP are required'
        });
    }

    try {
        const ride = await rideService.startRide({
            rideId, 
            otp,
            captain: req.captain
        });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        });

        return res.status(200).json(ride);
    } catch(err) {
        console.error('Start ride error:', err);
        return res.status(500).json({message: err.message});
    }
}

module.exports.endRide = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});

    }

    const {rideId} = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })

        return res.status(200).json(ride)
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
}