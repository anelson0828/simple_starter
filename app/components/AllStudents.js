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
  Dropdown,
  Input,
} from 'semantic-ui-react';
import {
  searchStudentsThunk,
  filterStudentsThunk,
} from '../redux/filteredStudents';

class DisconnectedAllStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { key: 1, text: 'Has Campus', value: 1 },
        { key: 2, text: 'No Campus', value: 2 },
      ],
    };
  }

  render() {
    const students = this.props.filteredStudents;

    if (students.length === 0) {
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
          <Input
            action={{ icon: 'search' }}
            placeholder="Search..."
            onChange={this.props.searchStudents}
          />
          <Dropdown
            placeholder="Filter"
            search
            clearable
            options={this.state.options}
            selection
            onChange={this.props.filterStudents}
          />
        </Container>
        <Card.Group stackable itemsPerRow="3">
          {students.map(student => (
            <Card raised key={student.id} style={{ margin: '1rem' }}>
              <NavLink to={`/students/${student.id}`} key={student.id}>
                <Image centered size="medium" src={student.imageUrl} />
              </NavLink>
              <Card.Content>
                <NavLink to={`/students/${student.id}`} key={student.id}>
                  <Card.Header>
                    {student.firstName} {student.lastName}
                  </Card.Header>
                </NavLink>
              </Card.Content>
              <Card.Content extra>
                <Button
                  icon
                  onClick={() => {
                    this.props.deleteStudent(student.id);
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
  }
}

const mapState = state => {
  return {
    students: state.students,
    filteredStudents: state.filteredStudents,
  };
};

const mapDispatch = dispatch => {
  return {
    deleteStudent: studentId => dispatch(deleteStudentThunk(studentId)),
    filterStudents: event => dispatch(filterStudentsThunk(event)),
    searchStudents: event => dispatch(searchStudentsThunk(event)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedAllStudents)
);
