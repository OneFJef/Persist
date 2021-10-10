const router = require('express').Router();
const { auth } = require('express-openid-connect');
const { Task } = require('../../models');
const { currentUser } = require("../../utils/user_service");

// Get task data
router.get("/", async (req, res) => {
  try {
    const taskData = await Task.findAll();
    const tasks = taskData.map((task) => task.get({ plain: true }));

    res.json(tasks);
  } catch (err) {
    console.error(err);
  };
});

// Generate task json data 
router.get("/:id", async (req, res) => {
  try {
    const taskData = await Task.findByPk(req.params.id);
    const task = taskData.get({ plain: true });

    res.json(task);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new task
router.post("/", currentUser, async (req, res) => {

  try {
    const { color, category, category_sub, hours, start_time } = req.body;
    const taskData = await Task.create({ color, category, category_sub, hours, user_email: req.currentuser.email, start_time, is_completed: 1 });

    res.status(200).json(taskData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Update a specific task
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.update(
      {
        color: req.body.color,
        category: req.body.category,
        category_sub: req.body.category_sub,
        hours: req.body.hours,
        user_email: req.body.user_email,
        start_time: req.body.start_time,
        is_completed: req.body.is_completed,
      },
      {
        where: {
          id: req.params.id
        },
      },
    );
    if (!updatedTask[0]) {
      res.status(404).json({ message: "No task found with that id" });
      return;
    }

    res.json(updatedTask);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a specific task
router.delete('/:id', async (req, res) => {
  try {
    const taskData = await Task.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!taskData[0]) {
      res.status(404).json({ message: "No task found with that id" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;