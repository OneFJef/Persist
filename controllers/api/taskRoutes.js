const router = require('express').Router();
const { Task } = require('../../models');

router.post("/", async (req, res) => {
  try {
    
    const { color, category, category_sub, day, hours } = req.body;
    const taskData = await Task.create({ color, category, category_sub, day, hours });
    
    res.status(200).json(taskData);
  } catch (err) {
    res.status(400).json(err);
  }
});
  
  


module.exports = router;