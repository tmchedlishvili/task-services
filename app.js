const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    Promise = require("bluebird"),
    config = require('./config'),
    DBConnector = require('./util/DBConnector'),
    cors = require('cors'),
    logger = require('./util/Logger');

mongoose.Promise = Promise;

/* Init Mongoose models */
var modelsDir = __dirname + '/models/';
var modelFiles = fs.readdirSync(modelsDir);
modelFiles.forEach(function (file) {
    if (/^[^\.].*\.js$/.test(file)) {
        require(modelsDir + file);
    }
});

var app = express();
app.use(bodyParser.json({limit: '300mb'}));
app.use(cors());

logger.info('Connecting to DB');
DBConnector.connect()
    .on('error', console.error)
    .on('disconnected', DBConnector.connect)
    .once('open', listen);




/**
 *  Routes
 */
const index = require('./routes/index');
app.use('/', index);

function listen() {
    app.listen(config.port, function () {
        logger.info('App listening on port: ' + config.port)
    });
}

module.exports = app;

