'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  Course.associate = (models) => {
    Course.hasMany(models.Module, {
      foreignKey: 'courseId',
      as: 'modules'
    });
    
  }
  return Course;
};