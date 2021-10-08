const router = require("express").Router();
const { User, Task, Day } = require("../models");
const { isAuthenticated } = require("express-openid-connect")
router.get("/", async (req, res) => {
  if (req.oidc.isAuthenticated()) {
  try {
    const taskData = await Task.findAll({
      where: {
        user_email: req.oidc.user.email,
      }
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
      username: req.oidc.user.nickname,
      email: req.oidc.user.email,
    });
  }
  catch (err) {
  }
}
else {
  res.redirect("/login")
}
});

router.get("/day", async (req, res) => {
  try {
    const taskData = await Task.findAll(
      {
        where: {
        user_email: req.oidc.user.email
        }
      },
      {
        include: [{ model: Day }],
      });
    const tasks = taskData.map((task) => task.get({ plain: true }));
    res.render('day', {
      tasks,
      logged_in: req.oidc.isAuthenticated()
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/newtask", async (req, res) => {
  try {

    res.render('newtask', { logged_in: req.oidc.isAuthenticated() })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/week", async (req, res) => {
  try {

    res.render('week', { logged_in: req.oidc.isAuthenticated() });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Go to a specific task
router.get("/task/:id", async (req, res) => {
  try {
    const taskData = await Task.findByPk(req.params.id);
    const task = taskData.get({ plain: true });

    res.render('task', {
      task,
      logged_in: req.oidc.isAuthenticated()
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

module.exports = router;
