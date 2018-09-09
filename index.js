const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const env = dotenv.config();
dotenvExpand(env);

require('babel-register');

// Load and initialize server app
require('./src/server/app.js');
