# AutoDarkMode

Automaticallly sets Dark Mode at night and Light Mode on day in Windows 10 on startup.


## Prerequisites

* You need to have Typescript installed (globally)
* You need to have ```pkg``` installed globally if you want to use the executable

### Manual Setting

note: you need to do this when you want a permanent change (also best before first useage)

Besides in the Windows 10 settings you can also change your color theme by typing:
* System Light: ```npm run system-light```
* System Dark: ```npm run system-dark```
* Apps Dark: ```npm run apps-light```
* Apps Dark: ```npm run apps-dark```

Or use the scripts in ```./ps1 scripts``` directly.


## Usage

* From node.js: Run ```npm start``` for Typescript and running the compiled Javascript
* From executable: Run ```npm run bin``` and start ```./bin/auto-dark-mode.exe```


### For Auto Change on Startup
* Run ```npm run bin``` for Typescript and exporting to an executable to ```./bin``` and copying it to the Windows 10 startup folder (You can replace it with a link afterwards if you want)
* Or copy a link of ```./start.bat``` to ```C:\Users\[user]\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup```
* Or copy (a link of) ```./ps1 scripts/AutoDarkMode.ps1``` to ```C:\Users\[user]\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup```
