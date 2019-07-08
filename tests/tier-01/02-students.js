const { expect } = require('chai')
import enzyme, { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  students: [],
}

import mockAxios from '../mock-axios'
import { setStudents, fetchStudents } from '../../app/redux/students'

import rootReducer from '../../app/redux'
import { createStore } from 'redux'

const app = require('../../server')
const agent = require('supertest')(app)

const { db } = require('../../server/db')
const { Student } = require('../../server/db')

const adapter = new Adapter()
enzyme.configure({ adapter })

import { AllStudents } from '../../app/components/AllStudents'

describe('Tier One: Students', () => {
  describe('<AllStudents /> component', () => {
    xit('renders the students passed in as props', () => {
      const wrapper = shallow(
        <AllStudents
          students={[
            { id: 1, firstName: 'Mae', lastName: 'Jemison' },
            { id: 2, firstName: 'Sally', lastName: 'Ride' },
          ]}
        />
      )
      expect(wrapper.text()).to.include('Mae Jemison')
      expect(wrapper.text()).to.include('Sally Ride')
    })

    xit('*** renders "No Students" if passed an empty array of students', () => {
      throw new Error('replace this error with your own test')
    })
  })

  describe('Redux', () => {
    let fakeStore
    beforeEach(() => {
      fakeStore = mockStore(initialState)
    })

    describe('set students', () => {
      const students = [
        { id: 1, firstName: 'Mae', lastName: 'Jemison' },
        { id: 2, firstName: 'Sally', lastName: 'Ride' },
      ]

      xit('setStudents action creator', () => {
        expect(setStudents(students)).to.deep.equal({
          type: 'SET_STUDENTS',
          students,
        })
      })

      xit('fetchStudents thunk creator', async () => {
        mockAxios.onGet('/api/students').replyOnce(200, students)
        await fakeStore.dispatch(fetchStudents())
        const actions = fakeStore.getActions()
        expect(actions[0].type).to.equal('SET_STUDENTS')
        expect(actions[0].students).to.deep.equal(students)
      })
    })

    describe('reducer', () => {
      let testStore
      beforeEach(() => {
        testStore = createStore(rootReducer)
      })

      xit('*** returns the initial state by default', () => {
        throw new Error('replace this error with your own test')
      })

      xit('reduces on SET_STUDENTS action', () => {
        const students = [
          { id: 1, firstName: 'Mae', lastName: 'Jemison' },
          { id: 2, firstName: 'Sally', lastName: 'Ride' },
        ]
        const action = { type: 'SET_STUDENTS', students }

        const prevState = testStore.getState()
        testStore.dispatch(action)
        const newState = testStore.getState()

        expect(newState.students).to.be.deep.equal(students)
        expect(newState.students).to.not.be.equal(prevState.students)
      })
    })
  })

  describe('Express API', () => {
    // Let's test our Express routes WITHOUT actually using the database.
    // By replacing the findAll methods on the Campus and Student models
    // with a spy, we can ensure that our API tests won't fail just because
    // our Sequelize models haven't been implemented yet.
    const { findAll: studentFindAll } = Student
    beforeEach(() => {
      Student.findAll = sinon.spy(() => [
        { id: 1, firstName: 'Mae', lastName: 'Jemison' },
        { id: 2, firstName: 'Sally', lastName: 'Ride' },
      ])
    })
    afterEach(() => {
      Student.findAll = studentFindAll
    })

    xit('*** GET /api/students responds with all students', async () => {
      throw new Error('replace this error with your own test')
    })
  })

  describe('Sequelize Model', () => {
    before(() => db.sync({ force: true }))
    afterEach(() => db.sync({ force: true }))

    xit('has fields firstName, lastName, email, imageUrl, gpa', async () => {
      const student = await Student.create({
        firstName: 'Sally',
        lastName: 'Ride',
        email: 'sallyride@nasa.gov',
        imageUrl: '/images/sallyride.png',
        gpa: 3.8,
      })
      expect(student.firstName).to.equal('Sally')
      expect(student.lastName).to.equal('Ride')
      expect(student.imageUrl).to.equal('/images/sallyride.png')
      expect(student.email).to.equal('sallyride@nasa.gov')
      expect(parseFloat(student.gpa)).to.equal(3.8)
    })

    xit('requires firstName, lastName, email', async () => {
      const student = Student.build()
      try {
        await student.validate()
        throw Error(
          'validation should have failed without firstName, lastName, email'
        )
      } catch (err) {
        expect(err.message).to.contain('firstName cannot be null')
        expect(err.message).to.contain('lastName cannot be null')
        expect(err.message).to.contain('email cannot be null')
      }
    })

    xit('firstName, lastName, email cannot be empty', async () => {
      const student = Student.build({ firstName: '', lastName: '', email: '' })
      try {
        await student.validate()
        throw Error('validation should have failed with empty name and address')
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on firstName')
        expect(err.message).to.contain('Validation notEmpty on lastName')
        expect(err.message).to.contain('Validation notEmpty on email')
      }
    })

    xit('*** email must be a valid email', async () => {
      throw new Error('replace this error with your own test')
    })

    xit('gpa must be a float between 0.0 and 4.0', async () => {
      const student = {
        firstName: 'Sally',
        lastName: 'Ride',
        email: 'sallyride@nasa.gov',
        gpa: 4.1,
      }
      const overachiever = Student.build(student)
      try {
        await overachiever.save()
        throw Error('validation should have failed with too high gpa')
      } catch (err) {
        expect(err.message).to.contain('Validation max on gpa')
      }
      student.gpa = -1
      const underachiever = Student.build(student)
      try {
        await underachiever.validate()
        throw Error('validation should have failed with too low gpa')
      } catch (err) {
        expect(err.message).to.contain('Validation min on gpa')
      }
    })

    xit('default imageUrl if left blank', () => {
      const student = Student.build({ firstName: '', lastName: '', email: '' })
      expect(student.imageUrl).to.be.a('string')
      expect(student.imageUrl.length).to.be.greaterThan(1)
    })
  })
})
