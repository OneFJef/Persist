const router = require('express').Router();
const { User, Task } = require('../models');

router.get('/', async (req, res) => {
  try {
    const taskData = await Task.findAll();
    const tasks = taskData.map((task) => task.get({ plain: true }));

    res.render('homepage', { 
      tasks,
      logged_in: req.oidc.isAuthenticated()});
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/day', async (req, res) => {
  try {
    const taskData = await Task.findAll();
    const tasks = taskData.map((task) => task.get({ plain: true }));
    res.render('day', { tasks });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newtask', async (req, res) => {
  try {

    res.render('newtask');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new task
router.post("/newtask", async (req, res) => {
  try {

    const { color, category, category_sub, day, hours } = req.body;
    const taskData = await Task.create({ color, category, category_sub, day, hours });

    res.status(200).json(taskData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/week', async (req, res) => {
  try {

    res.render('week');
  } catch (err) {
    res.status(500).json(err);
  }
});


// Go to a specific task
router.get('/task/:id', async (req, res) => {
  try {
    const taskData = await Task.findByPk(req.params.id);
    const task = taskData.get({ plain: true });

    res.render('task', { task });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Edit a specific task
router.put('/task/:id', async (req, res) => {
  try {
    const taskData = await Task.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!taskData[0]) {
      res.status(404).json({ message: "No task found with that id" });
      return;
    }

    const task = taskData.get({ plain: true });
    res.render('task', { task });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
