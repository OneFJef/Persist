const router = require("express").Router();
const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");

router.use("/users", userRoutes);
router.use("/task", taskRoutes);

module.exports = router;
