const express = require('express'),
		config = require('../config'),
		ApiResponse = require('../util/ApiResponse'),
		request = require('request'),
  		router = express.Router();

router.get('/', function (req, res) {
  res.json({
    env: process.env.NODE_ENV || 'not set - dev is used',
    nodeVersion: process.version,
    uptime: process.uptime() || null,
    os: process.platform,
    memoryUsage: process.memoryUsage(),
    time: new Date()
  });
});

function isLoggedIn(req, res, next) {
    console.log('some Auth there')    
    next();
        
}

router.use('/tasks', isLoggedIn, require('./tasks'));

module.exports = router;
