'use strict';
module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Module.associate = models => {
      Module.belongsTo(models.Course, {
        foreignKey: 'courseId',
        onDelete: 'CASCADE'
      });
  }
  return Module;
}