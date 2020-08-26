<b>Note</b>: If you're really looking for a solution and not just a play-around with JavaScript, better go for <a href="https://github.com/Armin2208/Windows-Auto-Night-Mode">Windows-Auto-Night-Mode by Armin2208</a>. 🙂<br>

# AutoDarkMode

(Automaticallly) sets Dark Mode at night and Light Mode on day in Windows 10 on startup.

## Prerequisites

-   You need to have <a href="https://www.npmjs.com/package/typescript">Typescript</a> installed (globally)
-   You need to have <a href="https://www.npmjs.com/package/pkg">pkg</a> installed globally `if you want to use the executable`

### Set Manually

**Note:** you need to do this when you want a permanent change `(also best before first useage)`

Besides in the Windows 10 settings you can also change your color theme by **(running `tsc` first and then)** typing:

-   System Light: `npm run system-light`
-   System Dark: `npm run system-dark`
-   Apps Dark: `npm run apps-light`
-   Apps Dark: `npm run apps-dark`

Or use the scripts in "./ps1 scripts" directly.

## Usage

-   From **node.js**: Run `npm start` for Typescript and running the compiled Javascript
-   From **executable**: Run `npm run bin` and start "./bin/auto-dark-mode.exe"

### For Auto Change on Startup

-   Either... <br>
    --> Run `npm run bin` for Typescript and exporting to an executable to "./bin" and copying it to the Windows 10 startup folder (You can replace it with a link afterwards if you want)
-   Or... <br>
    --> Run `tsc` and copy a link of `"./start.bat"` to `"C:\Users\[user]\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup"`
-   Or... `(No need for node actually)` <br>
    --> Copy (a link of) `"./ps1 scripts/AutoDarkMode.ps1"` to `"C:\Users\[user]\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup"`

### Change time in which Dark Mode shall be activated

Just change the numbers in `./src/setMode.js`, line 21 to whatever time you prefer (**Note: use 24 hr time format**) and rerun `tsc` or `npm start` or `npm run bin`.

### Change name of executable, config-file name or name of folder in which config-file gets saved

Just change settings in `./settings.json`.

### Uninstall

To uninstall created files run `npm run uninstall`

## License

This project is licensed under the MIT License.
