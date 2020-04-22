const command = 'Set-ItemProperty';
const path = 'HKCU:/Software/Microsoft/Windows/CurrentVersion/Themes/Personalize';

exports.scripts = {
	apps: {
		light: `${command} -Path ${path} -Name AppsUseLightTheme -Value 1`,
		dark: `${command} -Path ${path} -Name AppsUseLightTheme -Value 0`
	},
	system: {
		light: `${command} -Path ${path} -Name SystemUsesLightTheme -Value 1`,
		dark: `${command} -Path ${path} -Name SystemUsesLightTheme -Value 0`
	}
};
