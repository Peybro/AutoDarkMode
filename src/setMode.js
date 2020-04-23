const PowerShell = require('powershell');
const { scripts } = require('./scripts');

/**
 * @description 
 */
module.exports = function setMode(hostname, config) {
	const time = new Date();
	let appsMode, systemMode;

	const formatTimeDigit = (timeElem) => (timeElem < 10 ? `0${timeElem}` : timeElem);
	const timeBanner = (time) =>
		`It's ${formatTimeDigit(time.getHours())}:${formatTimeDigit(time.getMinutes())} - Time to`;

	if (time.getHours() < 7 || time.getHours() >= 20) {
		console.log(`${timeBanner(time)} take care of your eyes B-)`);

		appsMode = config[hostname].apps ? new PowerShell(scripts.apps.dark) : new PowerShell(scripts.apps.light);
		systemMode = config[hostname].system
			? new PowerShell(scripts.system.dark)
			: new PowerShell(scripts.system.light);
	} else {
		console.log(`${timeBanner(time)} let it shine! ☀`);

		appsMode = config[hostname].apps ? new PowerShell(scripts.apps.light) : new PowerShell(scripts.apps.dark);
		systemMode = config[hostname].system
			? new PowerShell(scripts.system.light)
			: new PowerShell(scripts.system.dark);
	}

	[ appsMode, systemMode ].forEach((field) => {
		// Handle process errors (e.g. powershell not found)
		field.on('error', (err) => {
			console.error(err);
		});

		// // Stdout
		// field.on('output', (data) => {
		// 	console.log(data);
		// });

		// Stderr
		field.on('error-output', (data) => {
			console.error(data);
		});

		// // End
		// field.on('end', (code) => {
		// 	// Do Something on end
		// 	console.log("Script successfully applied.")
		// });
	});
};
