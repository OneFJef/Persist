const router = require("express").Router();
const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");
const dayRoutes = require("./dayRoutes");

router.use("/users", userRoutes);
router.use("/task", taskRoutes);
router.use("/day", dayRoutes);

module.exports = router;
