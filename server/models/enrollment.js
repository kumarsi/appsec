'use strict';
module.exports = function(sequelize, DataTypes) {
  const Enrollment = sequelize.define('Enrollment', {
    completionStatus: DataTypes.STRING,
    slidesReviewed: DataTypes.INTEGER,
    user: DataTypes.STRING
  });
  Enrollment.associate = models => {
    Enrollment.belongsTo(models.Module, {
      foreignKey: 'moduleId',
      onDelete: 'CASCADE'
    });
  };
  Enrollment.Status = {
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED"
  }
  return Enrollment;
};