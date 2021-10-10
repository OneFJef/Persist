const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Day extends Model {}

Day.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Day used to assign tasks to.
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Task from the task table.
    task_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "task",
        key: "id",
      },
    },
    // Length of the task.
    activity_length: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // User account which a task is assigned to.
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "day",
  }
);

module.exports = Day;
