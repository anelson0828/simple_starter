import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteStudentThunk } from '../redux/students';
import { Card, Container } from 'semantic-ui-react';
import AllStudentsHeader from './AllStudentsHeader';
import AllStudentsCard from './AllStudentsCard';

class DisconnectedAllStudents extends React.Component {
  render() {
    const students = this.props.students;

    if (students.length === 0) {
      return (
        <Container textAlign="center" style={{ marginTop: '5rem' }}>
          <AllStudentsHeader />
          <p>There are no students registered in the database.</p>
        </Container>
      );
    }
    return (
      <Container textAlign="center" style={{ marginTop: '5rem' }}>
        <AllStudentsHeader />
        <Card.Group stackable itemsPerRow="3">
          {students.map(student => (
            <AllStudentsCard
              deleteStudent={this.props.deleteStudent}
              student={student}
              key={student.id}
            />
          ))}
        </Card.Group>
      </Container>
    );
  }
}

const mapState = state => {
  return {
    students: state.students,
  };
};

const mapDispatch = dispatch => {
  return {
    deleteStudent: studentId => dispatch(deleteStudentThunk(studentId)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedAllStudents)
);
