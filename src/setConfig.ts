const fs = require('fs');
const path = require('path');

const inquirer = require('inquirer');

/**
 * Creates (or modifies) a config file and saves in a specific directory.
 * 
 * @param {string} hostname - Name of the PC the setting is for
 * @param {object} [config={}] - Parsed JSON object from config-file (empty object if none if given)
 * @param {string} configDir - Directory in which the file shall be saved
 * @param {string} [configFile='config.json'] - Filename of config file ('config.json' if none is given)
 */
module.exports = function setConfig(
	hostname: string,
	config: object = {},
	configDir: string,
	configFile: string = 'config.json'
): void{
	inquirer
		.prompt([
			{
				type: 'confirm',
				name: 'createNew',
				message: 'Would you like to create it now?'
			}
		])
		.then((answers: any) => {
			if (answers.createNew) {
				inquirer
					.prompt([
						{
							type: 'confirm',
							name: 'apps',
							message: 'Do you want your apps to be affected by auto dark mode?'
						},
						{
							type: 'confirm',
							name: 'system',
							message: 'Do you want your system to be affected by auto dark mode?'
						}
					])
					.then((answers: object) => {
						/** Create directory if not existant yet */
						if (!fs.existsSync(configDir)) {
							fs.mkdirSync(configDir);
						}
						/** Save file */
						fs.writeFile(
							//! './src/pc-config.json',
							path.join(configDir, configFile),
							JSON.stringify({ ...config, [hostname]: answers }),
							(err: any) => {
								if (err) {
									// console.error(err);
									return;
								}
								/** file written successfully */
								console.log(
									`Successfully created '${configFile}' for configuration in '${configDir}'.`
								);
								console.log(
									`If you want to change it, just change true/false in it or delete '${configFile}' and re-run this program.`
								);
								/** now run the actual program which should work by now */
								//! require('./setMode')(hostname, require('./pc-config.json'));
								require('./setMode')(
									hostname,
									JSON.parse(fs.readFileSync(path.join(configDir, configFile)))
								);
							}
						);
					});
			} else {
				/** quit program */
				console.log('Bye then :)');
				process.exit(0);
			}
		});
};
