const { validationResult } = require('express-validator');
const mapService = require('../services/map.service');

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({message: "Address is required"});
    }

    try {
        const timeout = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Request timed out")), 5000)
        );

        const coordinates = await Promise.race([
            mapService.getAddressCoordinate(address), 
            timeout
        ]);
        return res.status(200).json(coordinates);
    } catch (err) {
        if (err.message === "Request timed out") {
            return res.status(408).json({ message: "Request timed out" });
        }
        return res.status(404).json({ message: "Coordinates not found" });
    }
};


module.exports.getDistanceTime = async (req, res, next) => {
    try {
        const errors  = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array()});
        }

        const {origin, destination} = req.query;

        const distanceTime = await mapService.getDistanceTime(origin, destination);

        res.status(200).json(distanceTime);

    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Internal Sever Error'});
    }
}

module.exports.getAutoCompleteSuggestions = async(req, res, next) => {
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {input} = req.query;
        
        const suggestions = await mapService.getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);


    } catch(err) {
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'});
    }
}