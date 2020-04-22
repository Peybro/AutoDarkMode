const hostname = require('os').hostname;
const PowerShell = require('powershell');
const inquirer = require('inquirer');
const { scripts } = require('./scripts');
const config = require('./pc-config.json');

// TODO
// if (require('fs').existsSync('./pc-config.json')) {
// 	checkAndRun();
// } else {
// 	require('fs').writeFile('./src/pc-config.json', '{}', function(err) {
// 		if (err) throw err;
// 		console.log('"pc-config.json" was created successfully.');
// 		//start actual program
// 	});
// }

if (config[hostname]) {
	//TODO: setInterval for continous checking for time => powershell keeps opened
	// const interval = setInterval(() => {
	setMode();
	// }, 10 * minute);
	// const second = 1000
	// const minute = sec * 60
	// const hour = min * 60
} else {
	createConfig();
}

function setMode() {
	const config = require('./pc-config.json');
	const time = new Date();
	let appsMode, systemMode;

	const formatTimeDigit = (timeElem) => (timeElem < 10 ? `0${timeElem}` : timeElem);

	console.log(`It's ${formatTimeDigit(time.getHours())}:${formatTimeDigit(time.getMinutes())}. Time to...`);

	if (time.getHours() < 7 || time.getHours() >= 20) {
		console.log('... take care of your eyes B-)');

		if (config[hostname].apps) appsMode = new PowerShell(scripts.apps.dark);
		if (config[hostname].system) systemMode = new PowerShell(scripts.system.dark);
	} else {
		console.log('... let it shine! ☀');

		if (config[hostname].apps) appsMode = new PowerShell(scripts.apps.light);
		if (config[hostname].system) systemMode = new PowerShell(scripts.system.light);
	}

	[ appsMode, systemMode ].forEach((field) => {
		if (field) {
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
		}
	});
}

function createConfig() {
	const config = require('./pc-config.json');

	console.log("I could not find a setting for your PC in 'pc-config.json'.");
	inquirer
		.prompt([
			{
				type    : 'confirm',
				name    : 'createNew',
				message : 'Would you like to create it now?'
			}
		])
		.then((answers) => {
			if (answers.createNew) {
				inquirer
					.prompt([
						{
							type    : 'confirm',
							name    : 'apps',
							message : 'Do you want your apps to get dark/light?'
						},
						{
							type    : 'confirm',
							name    : 'system',
							message : 'Do you want your system to get dark/light?',
							when    : function(answers) {
								return answers.apps;
							}
						}
					])
					.then((answers) => {
						console.log("Please re-run program.");
						require('fs').writeFileSync(
							'./src/pc-config.json',
							JSON.stringify({ ...config, [hostname]: answers })
						);
					})
			} else {
				console.log('Bye then :)');
			}
		});
}
