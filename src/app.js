require('dotenv').config();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const chalk = require('chalk');
const path = require('path');
const hbs = require('hbs');
const express = require('express');
const app = express();

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
	console.log(req.query);
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

// app.get('/products', (req, res) => {
// 	if (!req.query.search) {
// 		return res.send({
// 			// withou return the execution of get function doesn't stop here
// 			message: 'You must provide a search term.'
// 		});
// 	}
// 	res.send({
// 		products: []
// 	});
// });

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		name: 'Aung'
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

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});
