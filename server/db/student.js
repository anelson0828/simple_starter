const Sequelize = require('sequelize');
const db = require('./database');
const Datatypes = require('sequelize/lib/data-types');

const Student = db.define('students', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notNull: true,
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://s3.amazonaws.com/uifaces/faces/twitter/travis_arnold/128.jpg',
  },
  gpa: {
    type: Datatypes.DECIMAL(2, 1),
    defaultValue: 0.0,
    validate: {
      min: 0.0,
      max: 4.0,
    },
  },
});

module.exports = Student;
