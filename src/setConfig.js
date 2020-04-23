const inquirer = require('inquirer');

/**
 * @description 
 */
module.exports = function setConfig(hostname, config) {
	console.log("I could not find a setting for your PC.");
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
						require('fs').writeFile(
							'./src/pc-config.json',
							JSON.stringify({ ...config, [hostname]: answers }),
							(err) => {
								if (err) {
									console.error(err);
									return;
								}
								// file written successfully
								console.log(
									'Successfully created a configuration for your PC.'
                                );
                                // now run the actual program which should work by now
								require('./setMode')(hostname, require('./pc-config.json'));
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
