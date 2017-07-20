const mongoose = require('mongoose'),
	TaskModel = mongoose.model('task'),
  ApiResponse = require('../util/ApiResponse');

function TaskController() {
}

TaskController.search = function (req, res) {
  TaskModel.find({}).then(function (tasks) {
    ApiResponse.success(res, tasks);
  }, function (err) {
    ApiResponse.failure(res, err, 'DB error while searching tasks');
  })
};

/**
 * insert new task to Tasks collection
 */
TaskController.create = function (req, res) {
    let welcomeText = req.body.welcomeText;

    let errMessageArr = [];
    if (!welcomeText) {
        errMessageArr.push('welcomeText');
    }
  
    if (errMessageArr.length) {
        return ApiResponse.failure(res, { message: 'required parameter is not present' }, errMessageArr.join(','));
    }

    let task = {
        welcomeText: welcomeText
    };

    TaskModel.create(task).then(function (result) {
        ApiResponse.success(res, result);
    }).catch(function (err) {
        ApiResponse.failure(res, err, 'DB error while inserting Task');
    });
};

module.exports = TaskController;
