const { green, red } = require('chalk');
const { db } = require('./server/db');

const Student = require('./server/db/student');
const Campus = require('./server/db/campus');

const students = [
  {
    firstName: 'Amanda',
    lastName: 'Nelson',
    email: 'amandamarienelson2@gmail.com',
    imageUrl: 'www.google.com',
    gpa: 3.9,
    campusId: 1,
  },
  {
    firstName: 'Bryce',
    lastName: 'Baker',
    email: 'bryce.ebaker@gmail.com',
    imageUrl: 'www.google.com',
    gpa: 4.0,
    campusId: 1,
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'test@example.com',
    imageUrl: 'www.google.com',
    gpa: 2.0,
    campusId: 2,
  },
  {
    firstName: 'John',
    lastName: 'Johnson',
    email: 'test@example.com',
    imageUrl: 'www.google.com',
    gpa: 3.0,
  },
];

const campuses = [
  {
    name: 'Test School',
    imageUrl: 'www.google.com',
    address: '171 North Aberdeen St, Chicago, IL',
    description: 'A great school',
  },
  {
    name: 'Test School2',
    imageUrl: 'www.google.com',
    address: '171 North Aberdeen St, Chicago, IL',
    description: 'A great school',
  },
  {
    name: 'Test School3',
    imageUrl: 'www.google.com',
    address: '171 North Aberdeen St, Chicago, IL',
    description: 'A great school',
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(campuses.map(campus => Campus.create(campus)));
    await Promise.all(students.map(student => Student.create(student)));
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
