import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteStudentThunk } from '../redux/students';
import { Card, Container } from 'semantic-ui-react';
import {
  searchStudentsThunk,
  filterStudentsThunk,
  sortStudentsThunk,
} from '../redux/filteredStudents';
import AllStudentsHeader from './AllStudentsHeader';
import AllStudentsCard from './AllStudentsCard';

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
          <AllStudentsHeader
            options={this.state.options}
            searchStudents={this.props.searchStudents}
            filterStudents={this.props.filterStudents}
            sort={this.props.sort}
          />
          <p>There are no students registered in the database.</p>
        </Container>
      );
    }
    return (
      <Container textAlign="center" style={{ marginTop: '5rem' }}>
        <AllStudentsHeader
          options={this.state.options}
          searchStudents={this.props.searchStudents}
          filterStudents={this.props.filterStudents}
          sort={this.props.sort}
        />
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
    filteredStudents: state.filteredStudents,
  };
};

const mapDispatch = dispatch => {
  return {
    deleteStudent: studentId => dispatch(deleteStudentThunk(studentId)),
    filterStudents: event => dispatch(filterStudentsThunk(event)),
    searchStudents: event => dispatch(searchStudentsThunk(event)),
    sort: event => dispatch(sortStudentsThunk(event)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedAllStudents)
);
