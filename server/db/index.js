const db = require('./database');
const Student = require('./student');
const Campus = require('./campus');

Student.belongsTo(Campus);
Campus.hasMany(Student);

module.exports = {
  db,
  Student,
  Campus,
};
