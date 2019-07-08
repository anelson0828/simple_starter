const Sequelize = require('sequelize');
const db = require('./database');

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://placekitten.com/200/300',
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Campus;
