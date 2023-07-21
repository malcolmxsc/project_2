const express = require('express');
const router = express.Router();
const logsCtrl = require('../controllers/logs');

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // If the user is authenticated, proceed to the next middleware or route handler
    return next();
  } else {
    // If the user is not authenticated, redirect to the login page
    res.redirect('/');
  }
}

// GET /logs (display all logs)
router.get('/', isAuthenticated, logsCtrl.index);

// GET /logs/new (show the form to create a new log)
router.get('/new', isAuthenticated, logsCtrl.newLog);

// POST /logs (create a new log)
router.post('/', isAuthenticated, logsCtrl.create);

// GET /logs/:id (display a specific log)
router.get('/:id', isAuthenticated, logsCtrl.show);

// DELETE /logs/:id (delete a specific log)
router.delete('/:id', isAuthenticated, logsCtrl.destroy);

// GET /logs/:id/edit (show the form to edit a specific log)
router.get('/:id/edit', isAuthenticated, logsCtrl.edit);

// PUT /logs/:id (update a specific log)
router.put('/:id', isAuthenticated, logsCtrl.update);

module.exports = router;