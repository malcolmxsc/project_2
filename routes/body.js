const express = require('express');
const router = express.Router();
const bodyCtrl = require('../controllers/body');

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

// GET /body (display body information)
router.get('/', isAuthenticated, bodyCtrl.renderIndex);

// GET /body/new (show the form for entering body information)
router.get('/new', isAuthenticated, bodyCtrl.newBody);

// POST /body (create a new body entry)
router.post('/', isAuthenticated, bodyCtrl.create);

module.exports = router;