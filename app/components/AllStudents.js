import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents } from '../redux/campuses';
import { withRouter, NavLink } from 'react-router-dom';
import CreateStudent from './CreateStudent';
import { deleteStudentThunk } from '../redux/students';

const DisconnectedAllStudents = props => {
  if (props.students.length === 0) {
    return (
      <div>
        <h1>All Students</h1>
        <p>There are no students registered in the database.</p>
      </div>
    );
  }
  return (
    <div>
      <h1>All Students</h1>
      <div id="student-list">
        {props.students.map(student => (
          <div className="items" key={student.id}>
            <NavLink to={`/students/${student.id}`} activeClassName="active">
              <div>
                <img src={student.imageUrl} />
              </div>
              {student.firstName} {student.lastName}
            </NavLink>
            <div>
              <button
                type="button"
                className="remove"
                onClick={() => {
                  props.deleteStudent(student.id);
                }}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
      <CreateStudent />
    </div>
  );
};

const mapState = state => {
  return {
    students: state.students,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchInitialStudents: () => dispatch(fetchStudents()),
    deleteStudent: studentId => dispatch(deleteStudentThunk(studentId)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedAllStudents)
);
