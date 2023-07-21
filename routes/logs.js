const express = require('express');
const router = express.Router();
const logsCtrl = require('../controllers/logs');

// GET /logs (display all logs)
router.get('/', logsCtrl.index);

// GET /logs/new (show the form to create a new log)
router.get('/new', logsCtrl.newLog);

// GET /logs/:id (display a specific log)
router.get('/:id', logsCtrl.show);

// POST /logs (create a new log)
router.post('/', logsCtrl.create);

module.exports = router;