const express = require('express'),
  router = express.Router(),
  TaskController = require('../controllers/TaskController');

router.get('/', TaskController.search);
router.post('/', TaskController.create);




module.exports = router;
