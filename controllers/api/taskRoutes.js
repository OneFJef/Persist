const router = require('express').Router();
const { Task } = require('../../models');

// Create new task
router.post("/", async (req, res) => {
  try {
    
    const { color, category, category_sub, hours } = req.body;
    const taskData = await Task.create({ color, category, category_sub, hours });
    
    res.status(200).json(taskData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Edit a specific task
router.put('/:id', async (req, res) => {
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
  
  


module.exports = router;