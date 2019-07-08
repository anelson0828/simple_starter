const { expect } = require('chai')
const { db } = require('../../server/db')
const { Campus, Student } = require('../../server/db')

describe('Tier One: Student > Campus Association', () => {
  before(() => db.sync({ force: true }))
  afterEach(() => db.sync({ force: true }))

  let student1, student2, campus
  beforeEach(async () => {
    campus = await Campus.create({
      name: 'Jupiter Jumpstart',
      address: '5.2 AU',
    })
    student1 = await Student.create({
      firstName: 'Sally',
      lastName: 'Ride',
      email: 'sallyride@nasa.gov',
      campusId: campus.id,
    })
    student2 = await Student.create({
      firstName: 'Mae',
      lastName: 'Jemison',
      email: 'maejemison@nasa.gov',
      campusId: campus.id,
    })
  })
  afterEach(() => db.sync({ force: true }))

  xit('a student may be assigned to at most one campus', async () => {
    const sallysCampus = await student1.getCampus()
    expect(sallysCampus.name).to.equal(campus.name)
  })

  xit('a campus may have many enrolled students', async () => {
    const result = await campus.hasStudents([student1, student2])
    expect(result).to.be.equal(true)
  })
})
