const User = require('../models/user');
const Exercise = require('../models/exercise');

module.exports = {
  index,
  show,
  newLog,
  create,
};

async function index(req, res) {
  try {
    const usersWithLogs = await User.find({ exercise: { $exists: true } }).populate(
      'exercise'
    );
    res.render('logs/', { title: 'Daily Logs', usersWithLogs });
  } catch (error) {
    res.status(500).send('Error fetching logs from the database.');
  }
}

function newLog(req, res) {
  res.render('logs/new', { title: 'New Log' });
}

async function create(req, res) {
  try {
    const { username, exerciseNotes, exerciseTime, exerciseType, date } = req.body;

    // Create a new Exercise document
    const exercise = await Exercise.create(req.body)//({
      // exerciseNotes,
      // exerciseTime,
      // exerciseType,
      // date,
    //});
    console.log(exercise)

    // Find the user by their username
    let user = await User.findOne({_id:req.user._id});

    if (!user) {
      // If the user doesn't exist, create a new user
      user = new User({ username });
    }
    console.log(user)
    // Add the new exercise to the user's log array
    user.exercise.push(exercise);

    // Save the user document (which also saves the exercise document)
    await user.save();

    res.redirect('/logs');
  } catch (error) {
    res.status(500).send('Error creating a new log entry.');
  }
}

async function show(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('log');

    if (!user) {
      return res.status(404).send('User not found.');
    }

    res.render('logs/show', { title: 'Log Details', user });
  } catch (error) {
    res.status(500).send('Error fetching user log details.');
  }
}