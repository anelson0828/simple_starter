const Sequelize = require('sequelize');
const db = require('./database');

const Campus = db.define('campuses', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://placekitten.com/200/300',
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Campus;
