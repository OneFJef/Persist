const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });


    // Logout
    router.post('/logout', (req, res) => {
      // When the user logs out, destroy the session
      if (req.session.loggedIn) {
        req.session.destroy(() => {
          res.status(204).end();
        });
      } else {
        res.status(404).end();
      }
    });

    module.exports = router;
