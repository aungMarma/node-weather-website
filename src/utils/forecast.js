const request = require('request');
const forecast = (latitude, longitude, callback) => {
	const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_NET_API_KEY}/${latitude},${longitude}`;
	request.get({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!');
		} else if (body.error) {
			callback('Unable to find location!');
		} else {
			const { currently, daily } = body;
			let forecastStr = daily.data[0].summary;
			forecastStr += " It's currently " + currently.temperature + ' degrees out.';
			forecastStr += ' There is a ' + currently.precipProbability + '% of rain.';
			callback(undefined, forecastStr);
		}
	});
};
module.exports = forecast;
