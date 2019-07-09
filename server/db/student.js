const Sequelize = require('sequelize');
const db = require('./database');

const Student = db.define('students', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://placekitten.com/200/300',
  },
  gpa: {
    type: Sequelize.FLOAT,
    defaultValue: 0.0,
    validate: {
      min: 0,
      max: 4,
    },
  },
});

module.exports = Student;
