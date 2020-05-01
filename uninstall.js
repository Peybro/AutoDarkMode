const fs = require('fs');
const path = require('path');

const bin_path = path.join(process.env.APPDATA, 'Microsoft/Windows/Start Menu/Programs/Startup/AutoDarkMode.exe');
const config_path = path.join(process.env.APPDATA, 'AutoDarkMode');
const config_file = 'config.json';

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
