const Body = require('../models/body');

module.exports = {
  newBody,
  create,
  renderIndex,
};

function newBody(req, res) {
  res.render('body/new', { title: 'Enter Your Body Information' });
}



async function create(req, res) {
  try {
    const { heightCM, BMI, weight, age } = req.body;

    // Create a new Body document
    const body = await Body.create({ heightCM, BMI, weight, age });

    // Access the authenticated user object using req.user
    const user = req.user;

    // Check if the user object exists and has a 'body' property
    if (!user) {
      console.error('Error: Invalid user object.');
      return res.status(500).send('Error creating a new body entry.');
    }

    // Set the new body entry to the user's 'body' property
    user.body = body;

    // Save the user document (which also saves the body document)
    await user.save();

    res.redirect('/body');
  } catch (error) {
    console.error('Error creating a new body entry:', error);
    res.status(500).send('Error creating a new body entry.');
  }
}

async function renderIndex(req, res) {
    try {
      // Access the authenticated user object using req.user
      const user = req.user;
  
      // Check if the user object exists and has a 'body' property
      if (!user || !user.body) {
        console.error('Error: Invalid user object or missing body property.');
        return res.status(500).send('Error rendering body information.');
      }
  
      // Fetch the user's body information using the body ID from the 'user.body' property
      const body = await Body.findById(user.body).sort({ createdAt: -1 }).limit(1);
  
      // Render the index page with the most recent body entry
      res.render('body/index', { title: 'Your Body Information', body });
    } catch (error) {
      console.error('Error rendering body information:', error);
      res.status(500).send('Error rendering body information.');
    }
  }