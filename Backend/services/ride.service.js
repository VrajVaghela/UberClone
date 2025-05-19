const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');
const mapService = require('./map.service');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    if(!pickup || !destination) {
        throw new Error('Pickup and Destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    // Assuming distanceTime.distance.value is in meters and distanceTime.duration.value is in seconds:
    const distanceInKm = distanceTime.distance.value / 1000;
    const durationInMinutes = distanceTime.duration.value / 60;

    const basefare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 1.5,
        car: 2,
        moto: 1
    };

    const perMinuteRate = {
        auto: 0.2,
        car: 0.3,
        moto: 0.1
    };

    const fare = {
        auto: basefare.auto + (perKmRate.auto * distanceInKm) + (perMinuteRate.auto * durationInMinutes),
        car: basefare.car + (perKmRate.car * distanceInKm) + (perMinuteRate.car * durationInMinutes),
        moto: basefare.moto + (perKmRate.moto * distanceInKm) + (perMinuteRate.moto * durationInMinutes)
    };

    return fare;
}

function getOtp(num) {
    const otp = crypto.randomInt(Math.pow(10, num -1), Math.pow(10, num)).toString();
    return otp;
}

module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if(!user|| !pickup || !destination || !vehicleType){
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);
    const otp = getOtp(6);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp,
        vehicleType,
        status: 'pending',
        fare: fare[vehicleType]
    });

    return ride;
}

module.exports.confirmRide = async ({ rideId, captain }) => {
    if (!rideId || !captain) {
        throw new Error('Missing required parameters');
    }

    const updatedRide = await rideModel.findByIdAndUpdate(
        rideId,
        { 
            $set: {
                captain: captain._id,
                status: 'accepted'
            }
        },
        { 
            new: true,
            select: '+otp'  // Include OTP in response
        }
    ).populate(['user', 'captain']);

    if (!updatedRide) {
        throw new Error('Ride not found or could not be updated');
    }

    return updatedRide;
};

module.exports.startRide = async ({rideId, otp, captain}) => {
    if(!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if(!ride) {
        throw new Error('Ride not found');
    }

    // Fix the status check - remove the extra !
    if(ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if(ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    // Update using findByIdAndUpdate for atomicity
    const updatedRide = await rideModel.findByIdAndUpdate(
        rideId,
        { status: 'ongoing' },
        { new: true }
    ).populate('user').populate('captain');

    return updatedRide;
}

module.exports.endRide = async ({rideId, captain}) => {
    if(!rideId || !captain) {
        throw new Error('Ride id and captain are required');
    }   

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain');

    if(!ride){
        throw new Error('Ride not found');
    }

    if(ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    const updatedRide = await rideModel.findByIdAndUpdate(
        rideId,
        { status: 'completed' },
        { new: true }
    ).populate('user').populate('captain');

    return updatedRide;
}

module.exports.getFare = getFare;