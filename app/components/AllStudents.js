import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents } from '../redux/campuses';
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
      <ul className="student-list">
        {props.students.map(student => (
          <li key={student.id}>
            {student.firstName} {student.lastName}
            <img src={student.imageUrl} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapState = state => {
  return {
    students: state.students,
    campuses: state.campuses,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchInitialStudents: () => dispatch(fetchStudents()),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedAllStudents)
);
