const router = require("express").Router();
const dayjs = require("dayjs");
const { User, Task, Day } = require("../models");
const { isAuthenticated } = require("express-openid-connect");

router.get("/", async (req, res) => {
  if (req.oidc.isAuthenticated()) {
    try {
      const taskData = await Task.findAll({
        where: {
          user_email: req.oidc.user.email,
        },
      });
      const tasks = taskData.map((task) => task.get({ plain: true }));

      res.render("homepage", {
        tasks,
        logged_in: req.oidc.isAuthenticated(),
      });
    } catch (err) {
      res.status(500).json(err);
    }
    try {
      const dbUserData = await User.create({
        email: req.oidc.user.email,
      });
    } catch (err) { }
  } else {
    res.redirect("/login");
  }
});

router.get("/day", async (req, res) => {
  try {
    const taskData = await Task.findAll({
      where: {
        user_email: req.oidc.user.email,
      },
    });
    const dayData = await Day.findAll();

    const day = dayData.map((day) => day.get({ plain: true }));
    const tasks = taskData.map((task) => task.get({ plain: true }));
    res.render('day', {
      day,
      tasks,
      logged_in: req.oidc.isAuthenticated()
    });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/buildDay", async (req, res) => {
  try {
    const dayData = await Day.findAll();

    const days = dayData.map((day) => day.get({ plain: true }));
    res.json(days);

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/newtask", async (req, res) => {
  try {
    res.render("newtask", { logged_in: req.oidc.isAuthenticated() });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/week", async (req, res) => {
  try {
    res.render("week", { logged_in: req.oidc.isAuthenticated() });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Go to a specific task
router.get("/task/:id", async (req, res) => {
  try {
    const taskData = await Task.findByPk(req.params.id);
    const task = taskData.get({ plain: true });

    res.render("task", {
      task,
      logged_in: req.oidc.isAuthenticated(),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

// Get task data
router.get("/tasks", async (req, res) => {
  try {
    const taskData = await Task.findAll();
    const tasks = taskData.map((task) => task.get({ plain: true }));

    res.json(tasks);
  } catch (err) {
    console.error(err);
  };
});

// Generate task json data 
router.get("/taskData/:id", async (req, res) => {
  try {
    const taskData = await Task.findByPk(req.params.id);
    const task = taskData.get({ plain: true });

    res.json(task);

  } catch (err) {
    res.status(500).json(err);
  }
});


// Add task to day
router.post("/day", async (req, res) => {
  try {

    const { day, task_id, activity_length } = req.body;
    const dayData = await Day.create({ day, task_id, activity_length });

    res.status(200).json(dayData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  };
});

// Remove task from day
router.delete("/day/:id", async (req, res) => {
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

// Update a specific task
router.put('/task/:id', async (req, res) => {
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

module.exports = router;
