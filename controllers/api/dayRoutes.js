const router = require('express').Router();
const { auth } = require('express-openid-connect');
const { Task, Day, User } = require('../../models');
const { currentUser } = require("../../utils/user_service");

router.get("/", async (req, res) => {
  try {
    const dayData = await Day.findAll({
      where: {
        user_email: req.oidc.user.email,
      }
    });

    const days = dayData.map((day) => day.get({ plain: true }));
    res.json(days);

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
// Add task to day
router.post("/", async (req, res) => {
    try {
  
      const { day, task_id, activity_length } = req.body;
      const dayData = await Day.create({ day, task_id, activity_length, user_email: req.oidc.user.email });
  
      res.status(200).json(dayData);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    };
  });

  // Remove task from day
router.delete("/:id", async (req, res) => {
    try {
      const dayData = await Day.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!dayData) {
        res.status(404).json({ message: "No day entry found with that id!" });
        return;
      };
  
      res.status(200).json(dayData);
  
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  });

  module.exports = router;