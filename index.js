const PowerShell = require('powershell');
const { scripts } = require('./scripts');

// const interval = setInterval(() => {
	const time = new Date();
	let appsMode, systemMode;

	console.log(
		`It's ${
			time.getHours() < 10 ? '0' + time.getHours() :
			time.getHours()}:${
			time.getMinutes() < 10 ? '0' + time.getMinutes() :
			time.getMinutes()}. Time to...`
	);

	if (time.getHours() < 7 || time.getHours() >= 20) {
		console.log('... take care of your eyes ;)');
		appsMode = new PowerShell(scripts.apps.dark);
		systemMode = new PowerShell(scripts.system.dark);
	} else {
		console.log('... let it shine!');
		appsMode = new PowerShell(scripts.apps.light);
		systemMode = new PowerShell(scripts.system.light);
	}

	[ appsMode, systemMode ].forEach((field) => {
		// Handle process errors (e.g. powershell not found)
		field.on('error', (err) => {
			console.error(err);
		});

		// Stdout
		field.on('output', (data) => {
			console.log(data);
		});

		// Stderr
		field.on('error-output', (data) => {
			console.error(data);
		});

		// End
		field.on('end', (code) => {
			// Do Something on end
		});
	});
// }, 3000);
