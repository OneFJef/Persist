const router = require('express').Router();
const { auth } = require('express-openid-connect');
const { Task } = require('../../models');
const { currentUser } = require("../../utils/user_service");


// Create new task
router.post("/", currentUser, async (req, res) => {

  try {
    const { color, category, category_sub, hours, } = req.body;
    const taskData = await Task.create({ color, category, category_sub, hours, user_email: req.currentuser.email });

    res.status(200).json(taskData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
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