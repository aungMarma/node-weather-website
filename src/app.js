require('dotenv').config();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const chalk = require('chalk');
const path = require('path');
const hbs = require('hbs');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Heroku or local port

// Define paths for Express config
const staticsPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars engine and views path
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// A middleware to print request url in chalk
// app.use((req, res, next) => {
// 	console.log(chalk.inverse.red('Reguest-Url: ' + req.url));
// 	next();
// });

// Setup static directory to serve
app.use(express.static(staticsPath));

// If I had a index.html (A SPECIAL FILE) in public folder
// This route will not get hit
app.get('', (req, res) => {
	res.render('index', {
		title: 'Home Page',
		name: 'Aung'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Page',
		name: 'Aung'
	});
});

app.get('/weather', (req, res) => {
	const address = req.query.address;
	if (!address) {
		return res.send({
			error: 'You must provide an address.'
		});
	}
	geocode(address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				location: location,
				forecast: forecastData,
				address: req.query.address
			});
		});
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		name: 'Aung',
		helpMessage: 'Help is on the way!!'
	});
});

// Match any route that had /help/...
app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Aung',
		errorMessage: 'Help page not found.'
	});
});

// Match any route that has not matched with any routes above
app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Aung',
		errorMessage: 'Page not found.'
	});
});

app.listen(port, () => {
	console.log('Server is up on port 3000');
});
