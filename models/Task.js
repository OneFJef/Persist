const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Store for task color.
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Category of the task.
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Sub category of the task.
    category_sub: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Hours alloted to task.
    hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Logged in user's email from user table.
    user_email: {
      type: DataTypes.STRING,
      references: {
        model: 'user',
        key: 'email',
      },
    },
    start_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'task',
  }
);

module.exports = Task;
    
