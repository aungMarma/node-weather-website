const request = require('request');
const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=${process.env.MAPBOX_API_KEY}&limit=1`;
	request.get({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to geocoding service!');
		} else if (body.features.length == 0) {
			callback('Unable to find location, try another!');
		} else {
			const [ location ] = body.features;
			const { place_name, center } = location;
			const [ longitude, latitude ] = center;
			// No error
			callback(undefined, {
				location: place_name,
				latitude: latitude,
				longitude: longitude
			});
		}
	});
};
module.exports = geocode;
