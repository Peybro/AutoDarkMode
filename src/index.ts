const fs = require('fs');
const path = require('path');
const os = require('os');

import setMode from "./setMode";
import setConfig from "./setConfig";

const configDir = path.join(process.env.APPDATA, '/AutoDarkMode');
const configFile = 'config.json';

let config: any;
try {
	config = JSON.parse(fs.readFileSync(path.join(configDir, configFile)));
	//! config = require('./pc-config.json');
} catch (error) {
	// console.error(error);
	console.log('I could not find a setting for your PC.');
	config = {};
} finally {
	const hostname = os.hostname;
	if (config[hostname]) {
		setMode(hostname, config);
	} else {
		// needs to hand over $config for the (unlikely) case that there's already another PC name saved in ```config.json```.
		setConfig(hostname, config, configDir, configFile);
	}
}
