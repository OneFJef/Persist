const router = require('express').Router();
const { auth } = require('express-openid-connect');
const { User } = require('../../models');
const { requiresAuth } = require('express-openid-connect');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.oidc.name,
      email: req.oidc.email,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
