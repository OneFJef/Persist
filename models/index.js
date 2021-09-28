const User = require('./User');
const TimeBlock = require('./TimeBlock');

User.hasMany(TimeBlock, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

TimeBlock.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = { User, TimeBlock };
