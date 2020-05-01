"use strict";
var fs = require("fs");
var path = require("path");
try {
    fs.copyFileSync("./bin/auto-dark-mode.exe", path.join(process.env.APPDATA, "Microsoft/Windows/Start Menu/Programs/Startup/AutoDarkMode.exe"));
}
catch (error) {
    console.log(error);
} finally {
    process.exit(0);
}
