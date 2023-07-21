const express = require('express');
const router = express.Router();
const logsCtrl = require('../controllers/logs');

// GET /logs (display all logs)
router.get('/', logsCtrl.index);

// GET /logs/new (show the form to create a new log)
router.get('/new', logsCtrl.newLog);

// POST /logs (create a new log)
router.post('/', logsCtrl.create);

// GET /logs/:id (display a specific log)
router.get('/:id', logsCtrl.show);

// DELETE /logs/:id (delete a specific log)
router.delete('/:id', logsCtrl.destroy);
// DELETE /logs/:id (delete a specific log)
router.get('/:id/edit',logsCtrl.edit);

router.put('/:id', logsCtrl.update);




module.exports = router