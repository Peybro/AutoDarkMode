const fs = require('fs');
const path = require('path');

const hostname = require('os').hostname;
const setMode = require('./setMode');
const setConfig = require('./setConfig');

const configDir = path.join(process.env.APPDATA, '/AutoDarkMode');
const configFile = 'pc-config.json';

let config;
try {
	config = JSON.parse(fs.readFileSync(path.join(configDir, 'pc-config.json')));
	//! config = require('./pc-config.json');
} catch (error) {
	// console.error(error);
	console.log('I could not find a setting for your PC.');
	config = {};
} finally {
	if (config[hostname]) {
		setMode(hostname, config);
	} else {
		setConfig(hostname, config, configDir, configFile);
	}
}
