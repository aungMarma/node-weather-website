const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageFirst = document.querySelector('#message-1');
const messagSecond = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	messageFirst.textContent = 'Loading message!';
	messagSecond.textContent = '';
	const location = search.value;
	fetch(`/weather?address=${location}`).then((response) => {
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
