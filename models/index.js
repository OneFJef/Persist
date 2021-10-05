const User = require("./User");
const Task = require("./Task");
const Day = require("./Day");

User.hasMany(Task, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Task.belongsTo(User, {
  foreignKey: "user_id",
});

Task.hasMany(Day, {
  foreignKey: 'task_id'
})

Day.belongsToMany(Task, {
  foreignKey: "task_id",
});

module.exports = { User, Task, Day };
