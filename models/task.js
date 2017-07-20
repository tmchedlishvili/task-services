var mongoose = require('mongoose');

var schema = mongoose.Schema({
	welcomeText: { type: String, required: true },
}, {
  timestamps: true,
	collection: 'tasks',
	safe: {
		w: "majority",
		wtimeout: 15000
	},
	read: 'nearest'
});

var Model = mongoose.model('task', schema);
