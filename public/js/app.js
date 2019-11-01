const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageFirst = document.querySelector('#message-1');
const messagSecond = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	messageFirst.textContent = 'Loading message!';
	messagSecond.textContent = '';
	const location = search.value;
	fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageFirst.textContent = data.error;
			} else {
				messageFirst.textContent = data.location;
				messagSecond.textContent = data.forecast;
			}
		});
	});
});

// Use this function
// fetchWeather(location, (data) => {
//     console.log('Data', data);
// });
const fetchWeather = (location, callback) => {
	fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				callback({ error: data.error });
			} else {
				callback(data);
			}
		});
	});
};
