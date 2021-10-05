const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');
const { auth } = require('express-openid-connect');

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
