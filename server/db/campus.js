const Sequelize = require('sequelize');
const db = require('./database');

const Campus = db.define('campuses', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://lorempixel.com/640/480/business/',
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Campus;
