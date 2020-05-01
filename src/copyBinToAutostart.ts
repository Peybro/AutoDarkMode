const fs = require("fs")
const path = require("path")

try {
    fs.copyFileSync("./bin/AutoDarkMode.exe", path.join(process.env.APPDATA, "Microsoft/Windows/Start Menu/Programs/Startup/auto-dark-mode.exe"))
} catch (error) {
    console.error(error)
}