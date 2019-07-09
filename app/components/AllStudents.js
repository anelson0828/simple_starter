import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents } from '../redux/campuses';
import { fetchSingleStudent } from '../redux/singleStudent';
import { withRouter } from 'react-router-dom';

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
          <div
            className="items"
            key={student.id}
            onClick={() => props.fetchStudent(student.id)}
          >
            <div>
              <img src={student.imageUrl} />
            </div>
            {student.firstName} {student.lastName}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    students: state.students,
    campuses: state.campuses,
    singleStudent: state.singleStudent,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchInitialStudents: () => dispatch(fetchStudents()),
    fetchStudent: studentId =>
      dispatch(fetchSingleStudent(studentId, ownProps)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedAllStudents)
);
