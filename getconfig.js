var fs = require('fs'),
    env = process.env.NODE_ENV || 'dev',
    colors = require('colors'),
    useColor = true,
    silent = false,
    color,
    config,
    path;

// set our color based on environment
if (env === 'dev') {
    color = 'red';
} else if (env === 'test') {
    color = 'yellow';
} else if (env === 'production') {
    color = 'green';
} else {
    color = 'blue';
}

// color
function c(str, color) {
    return useColor ? str[color] : str;
}

// build a file path to the config
path = __dirname + '/../../' + env + '_config.json';

// try to read it
try {
    config = fs.readFileSync(path, 'utf-8');
} catch (e) {
    console.error(c("No config file found for %s", 'red'), env);
    console.error(c("We couldn't find anything at: %s", 'grey'), path);
    throw e;
}

try {
    config = JSON.parse(config);
    if (config.getconfig) {
        if (config.getconfig.hasOwnProperty('colors')) useColor = config.getconfig.colors;
        if (config.getconfig.hasOwnProperty('silent')) silent = config.getconfig.silent;        
    }

} catch (e) {
    console.error(c("Invalid JSON file", 'red'));
    console.error(c("Check it at:", 'grey') + c(" http://jsonlint.com", 'blue'));
    throw e;
}

// log out what we've got
if (!silent) console.log(c(c(env, color), 'bold') + c(' environment detected', 'grey'));

// export it
module.exports = config;