const mongoose = require('mongoose'),
	fs = require('fs'),
	config = require('../config');

var connect = function() {

	var dbConf = config.db;

	if (dbConf.url) {
	 	return mongoose.connect(dbConf.url, dbConf.options).connection;
	}

	var key = fs.readFileSync(dbConf.keyPath);
	var ca = [fs.readFileSync(dbConf.caPath)];

	var opt = {
		replset: {
			ssl: true,
			sslValidate: false,
			sslCA: ca,
			sslKey: key,
			sslCert:key,
			strategy: 'ping'
		},
		user: dbConf.dbUser,
		pass: dbConf.dbPass
	};

	var hosts = []; 

	dbConf.replSet.forEach(function (repl) {
		hosts.push(repl.url + ':' + repl.port);
	});

	var url = 'mongodb://' + hosts.join(',') + '/' + dbConf.dbName + '?authSource=' + dbConf.dbName + '&replicaSet=' + dbConf.rsName;

	return mongoose.connect(url, opt).connection;
};

module.exports.connect = connect;
