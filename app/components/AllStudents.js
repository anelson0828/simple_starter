import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents } from '../redux/campuses';
import { withRouter, NavLink } from 'react-router-dom';
import { deleteStudentThunk } from '../redux/students';
import {
  Button,
  Card,
  Image,
  Container,
  Header,
  Icon,
} from 'semantic-ui-react';

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
    <Container textAlign="center" style={{ marginTop: '5rem' }}>
      <Header as="h2">
        <h1>All Students</h1>
      </Header>
      <Container textAlign="center" style={{ marginBottom: '2rem' }}>
        <NavLink to="/students/new">
          <Button primary>Add Student</Button>
        </NavLink>
      </Container>
      <Card.Group stackable itemsPerRow="2">
        {props.students.map(student => (
          <NavLink to={`/students/${student.id}`} key={student.id}>
            <Card raised key={student.id} style={{ margin: '1rem' }}>
              <Image size="medium" src={student.imageUrl} />
              <Card.Content>
                <Card.Header>
                  {student.firstName} {student.lastName}
                </Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Button
                  icon
                  onClick={() => {
                    props.deleteStudent(student.id);
                  }}
                >
                  <Icon name="delete" />
                </Button>
              </Card.Content>
            </Card>
          </NavLink>
        ))}
      </Card.Group>
    </Container>
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
