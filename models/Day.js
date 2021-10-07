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
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    task_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "task",
        key: "id",
      },
    },
    activity_length: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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
