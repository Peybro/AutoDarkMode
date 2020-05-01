const PowerShell = require('powershell');
const { scripts } = require('./scripts');

/**
 * Sets Windows 10 Dark Mode after 8pm and before 7am and Light Mode in between based on a configuration.
 *
 * @param {string} hostname - Name of the PC the setting is for
 * @param {object} config - Parsed JSON object from config-file
 */
export default function setMode(hostname: string, config: any): void{
	const time = new Date();
	let appsMode, systemMode;

	const formatTimeDigit = (timeElem: number) =>

			timeElem < 10 ? `0${timeElem}` :
			timeElem;
	const timeBanner = (time: Date) =>
		`It's ${formatTimeDigit(time.getHours())}:${formatTimeDigit(time.getMinutes())} - Time to`;

	if (time.getHours() < 7 || time.getHours() >= 20) {
		console.log(`${timeBanner(time)} take care of your eyes B-)`);

		if (config[hostname].apps) appsMode = new PowerShell(scripts.apps.dark);
		if (config[hostname].system) systemMode = new PowerShell(scripts.system.dark);
	} else {
		console.log(`${timeBanner(time)} let it shine! ☀`);

		if (config[hostname].apps) appsMode = new PowerShell(scripts.apps.light);
		if (config[hostname].system) systemMode = new PowerShell(scripts.system.light);
	}

	[ appsMode, systemMode ].forEach((field: any) => {
		if (field) {
			// Handle process errors (e.g. powershell not found)
			field.on('error', (err: string) => {
				console.error(err);
			});

			// // Stdout
			// field.on('output', (data) => {
			// 	console.log(data);
			// });

			// Stderr
			field.on('error-output', (data: string) => {
				console.error(data);
			});

			// // End
			// field.on('end', (code) => {
			// 	// Do Something on end
			// 	console.log("Script successfully applied.")
			// });
		}
	});
};
