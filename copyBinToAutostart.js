'use strict';
var fs = require('fs');
var path = require('path');
try {
	fs.copyFileSync(
		'./bin/auto-dark-mode.exe',
		path.join(
			process.env.APPDATA,
			'Microsoft/Windows/Start Menu/Programs/Startup',
			require('./settings.json').nameOfExecutableInAutoStartFolder
		)
	);
	console.log(
		`Successfully created executable and copied it to "${path.join(
			process.env.APPDATA,
			'Microsoft/Windows/Start Menu/Programs/Startup',
			require('./settings.json').nameOfExecutableInAutoStartFolder
		)}".`
	);
} catch (error) {
	console.log(error);
} finally {
	process.exit(0);
}
