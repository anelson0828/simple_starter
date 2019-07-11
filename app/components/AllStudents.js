import React from 'react';
import { connect } from 'react-redux';
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
      <Container textAlign="center" style={{ marginTop: '5rem' }}>
        <Header as="h2">All Students</Header>
        <p>There are no students registered in the database.</p>
      </Container>
    );
  }
  return (
    <Container textAlign="center" style={{ marginTop: '5rem' }}>
      <Header as="h2">All Students</Header>
      <Container textAlign="center" style={{ marginBottom: '2rem' }}>
        <NavLink to="/students/new">
          <Button primary>Add Student</Button>
        </NavLink>
      </Container>
      <Card.Group stackable itemsPerRow="3">
        {props.students.map(student => (
          <Card raised key={student.id} style={{ margin: '1rem' }}>
            <NavLink to={`/students/${student.id}`} key={student.id}>
              <Image centered size="medium" src={student.imageUrl} />
            </NavLink>
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
    deleteStudent: studentId => dispatch(deleteStudentThunk(studentId)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedAllStudents)
);
