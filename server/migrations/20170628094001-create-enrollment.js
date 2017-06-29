'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Enrollments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.STRING
      },
      completionStatus: {
        type: Sequelize.STRING
      },
      slidesReviewed: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      moduleId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Modules',
          key: 'id',
          as: 'moduleId'
        }
      }
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Enrollments')
};