const fs = require('fs');
const path = require('path');

const bin_path = path.join(
	process.env.APPDATA,
	'Microsoft/Windows/Start Menu/Programs/Startup',
	require('./settings.json').nameOfExecutableInAutoStartFolder
);
const config_path = path.join(process.env.APPDATA, require('./settings.json').configFolder_inAppData);
const config_file = require('./settings.json').configFile_inConfigFolder;

try {
	if (fs.existsSync(bin_path)) {
		fs.unlinkSync(bin_path);
	}
	if (fs.existsSync(config_path)) {
		fs.rmdirSync(config_path, { recursive: true });
	}
} catch (error) {
	console.error(error);
} finally {
	process.exit(0);
}
