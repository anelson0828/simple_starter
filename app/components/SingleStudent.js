import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const DisconnectedSingleStudent = props => {
  return (
    <div id="singleStudent">
      <h1>Single Student</h1>
      <div>
        <img src={props.selectedStudent.imageUrl} />
      </div>
      <div>
        <h2>
          {props.selectedStudent.firstName} {props.selectedStudent.lastName}
        </h2>
        Email: {props.selectedStudent.email}
        <br />
        GPA: {props.selectedStudent.gpa}
      </div>
      <div>
        <h3>
          {props.selectedStudent.campus
            ? props.selectedStudent.campus.name
            : 'This student does not have a campus.'}
        </h3>
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    selectedStudent: state.selectedStudent,
  };
};

export default withRouter(connect(mapState)(DisconnectedSingleStudent));
