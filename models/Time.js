const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Time extends Model {
}

Time.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Hours column for checking used hours.
    check_hours: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Time',
  }
);

module.exports = Time;
