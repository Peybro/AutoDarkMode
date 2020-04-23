const hostname = require('os').hostname;
const setMode = require('./setMode');
const setConfig = require('./setConfig');

let config;
try {
	// config = JSON.parse(require('fs').readFileSync('./src/pc-config.json'));
	config = require('./pc-config.json');
} catch (error) {
	config = {};
} finally {
	if (config[hostname]) {
		setMode(hostname, config);
	} else {
		setConfig(hostname, config);
	}
}
