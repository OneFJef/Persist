const User = require("./User");
const Task = require("./Task");
const Day = require("./Day");

User.hasMany(Task, {
  foreignKey: "user_email",
  onDelete: "CASCADE",
});

Task.belongsTo(User, {
  foreignKey: "user_email",
});

Task.belongsToMany(Day, {
  foreignKey: "task_id",
  through: "task_day",
});

Day.belongsToMany(Task, {
  foreignKey: "task_id",
  through: "task_day",
});

module.exports = { User, Task, Day };
