const { green, red } = require('chalk');
const { db } = require('./server/db');

const Student = require('./server/db/student');
const Campus = require('./server/db/campus');
const faker = require('faker');

const createStudent = async () => {
  for (let i = 0; i < 1000; i++) {
    const student = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      imageUrl: faker.image.avatar(),
      gpa: faker.random
        .number({ min: 0.0, max: 4.0, precision: 0.1 })
        .toFixed(2),
      campusId: Math.floor(Math.random() * 100 + 1),
    };
    await Student.create(student);
  }
};

const createCampus = async () => {
  for (let i = 0; i < 1000; i++) {
    const campus = {
      name: faker.company.companyName(),
      imageUrl: faker.image.image(),
      address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
      description: faker.lorem.paragraphs(),
    };
    await Campus.create(campus);
  }
};

const seed = async () => {
  try {
    await db.sync({ force: true });
    await createCampus();
    await createStudent();
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;

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
