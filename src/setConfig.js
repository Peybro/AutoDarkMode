const fs = require('fs');
const path = require('path');

const inquirer = require('inquirer');

/**
 * @description 
 */
module.exports = function setConfig(hostname, config, configDir, configFile) {
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
							message : 'Do you want your apps to be affected by auto dark mode?'
						},
						{
							type    : 'confirm',
							name    : 'system',
							message : 'Do you want your system to be affected by auto dark mode?'
						}
					])
					.then((answers) => {
						if (!fs.existsSync(configDir)) {
							fs.mkdirSync(configDir);
						}
						fs.writeFile(
							//! './src/pc-config.json',
							path.join(configDir, configFile),
							JSON.stringify({ ...config, [hostname]: answers }),
							(err) => {
								if (err) {
									console.error(err);
									return;
								}
								// file written successfully
								console.log(`Successfully created '${configFile}' for configuration in '${configDir}'.
If you want to change it, just change true/false in it or delete '${configFile}' and re-run this program.
								`);
								// now run the actual program which should work by now
								//! require('./setMode')(hostname, require('./pc-config.json'));
								require('./setMode')(
									hostname,
									JSON.parse(fs.readFileSync(path.join(configDir, configFile)))
								);
							}
						);
					});
			} else {
				// quit program
				console.log('Bye then :)');
				process.exit(0);
			}
		});
};
