const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    //const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
 

    const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${address}&format=json`;
   

    try {
        const response = await axios.get(url);
        if (response.data && response.data.length > 0) {
            const location = response.data[0];
            // return {
            //     ltd: location.lat,
            //     lng: location.lon
            // };
            return `${location.lat},${location.lon}`;
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    //const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    const url = `https://us1.locationiq.com/v1/directions/driving/${encodeURIComponent(origin)};${encodeURIComponent(destination)}?key=${apiKey}`;

    try {
        const response = await axios.get(url);
        //console.log('Full API Response:', response.data);

        if (response.data && response.data.routes && response.data.routes.length > 0) {
            const { distance, duration } = response.data.routes[0];
            console.log(response.data.routes[0]);
            return { distance, duration };
        } else {
            throw new Error('Unable to fetch distance and time');
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
}


module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://us1.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${encodeURIComponent(input)}&limit=5`;

    try {
        const response = await axios.get(url);
        if (response.data && response.data.length > 0) {
            // Map the predictions to return the display_name as suggestions
            return response.data.map(prediction => prediction.display_name).filter(value => value);
        } else {
            throw new Error('No suggestions found');
        }
    } catch (err) {
        console.error(err);
        throw new Error('Unable to fetch suggestions');
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;
}