import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchSingleStudent } from '../redux/singleStudent';

class DisconnectedSingleStudent extends React.Component {
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.studentId);
  }
  render() {
    const { selectedStudent } = this.props;
    return (
      <div id="singleStudent">
        <h1>Single Student</h1>
        <div>
          <img src={selectedStudent.imageUrl} />
        </div>
        <div>
          <h2>
            {selectedStudent.firstName} {selectedStudent.lastName}
          </h2>
          Email: {selectedStudent.email}
          <br />
          GPA: {selectedStudent.gpa}
        </div>
        <div>
          <h3>
            {selectedStudent.campus ? (
              <NavLink
                to={`/campuses/${selectedStudent.campus.id}`}
                activeClassName="active"
              >
                {selectedStudent.campus.name}
              </NavLink>
            ) : (
              'This student does not have a campus.'
            )}
          </h3>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    selectedStudent: state.selectedStudent,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchStudent: studentId =>
      dispatch(fetchSingleStudent(studentId, ownProps)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedSingleStudent)
);
