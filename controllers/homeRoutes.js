const router = require('express').Router();
const { User, Task } = require('../models');

router.get('/', async (req, res) => {
  try {
    const taskData = await Task.findAll();
    const tasks = taskData.map((task) => task.get({ plain: true }));

    res.render('homepage', { tasks });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/day', async (req, res) => {
  try {

    res.render('day');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/week', async (req, res) => {
  try {

    res.render('day');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/task/:id', async (req, res) => {
  try {
    const taskData = await Task.findByPk(req.params.id);
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
