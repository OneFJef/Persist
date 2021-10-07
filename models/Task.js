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
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_sub: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: 'user',
        key: 'email',
      },
    },
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
    
