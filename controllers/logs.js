const User = require('../models/user');
const Exercise = require('../models/exercise');


module.exports = {
  index,
  show,
  newLog,
  create,
  destroy,
  edit,
  update,
};

async function index(req, res) {
  try {
    const usersWithLogs = await User.find({ exercise: { $exists: true } }).populate(
      'exercise'
    );
    res.render('logs/index', { title: 'Daily Logs', usersWithLogs });
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
    const exercise = await Exercise.create(req.body)
     
    

    // Find the user by their username
    let user = await User.findOne({_id:req.user._id});

    if (!user) {
      // If the user doesn't exist, create a new user
      user = new User({ username });
    }
    
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
    const logEntry = await Exercise.findById(id);
    

    if (!logEntry) {
      return res.status(404).send('Log entry not found.');
    }

    res.render('logs/show', { title: 'Exercise Details', logEntry });
  } catch (error) {
    res.status(500).send('Error fetching log entry details.');
  }
}




async function destroy(req, res) {

  await Exercise.findOneAndDelete({_id: req.params.id})
 
  res.redirect('/logs');
 

}


async function edit(req, res) {
  try {
    const { id } = req.params;
    const logEntry = await Exercise.findById(id);

    if (!logEntry) {
      return res.status(404).send('Log entry not found.');
    }

    res.render('logs/edit', { title: 'Edit Log', logEntry });
  } catch (error) {
    res.status(500).send('Error fetching log entry details.');
  }
}


async function update(req, res) {
  try {
    const { id } = req.params;
    const { exerciseNotes, exerciseTime, exerciseType } = req.body;

    // Find the exercise log by its ObjectId and update it
    const updatedLogEntry = await Exercise.findByIdAndUpdate(
      id,
      {
        exerciseNotes,
        exerciseTime,
        exerciseType,
      },
      { new: true } // This option returns the updated document
    );

    if (!updatedLogEntry) {
      return res.status(404).send('Log entry not found.');
    }

    console.log('Updated log entry:', updatedLogEntry);

    // Redirect to the show page or any other appropriate location
    res.redirect('/logs/' + id);
  } catch (error) {
    console.error('Error updating log entry:', error);
    res.status(500).send('Error updating log entry.');
  }
}