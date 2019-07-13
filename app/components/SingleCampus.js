import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchSingleCampus,
  updateCampusThunk,
  updateStudentFromCampusThunk,
} from '../redux/singleCampus';
import { fetchStudentsThunk } from '../redux/students';

import StudentRow from './StudentRow';

import {
  Container,
  Header,
  Grid,
  Image,
  Button,
  Card,
  Divider,
  Dropdown,
} from 'semantic-ui-react';

class DisconnectedSingleCampus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      studentOptions: [],
      value: 1,
    };
    this.studentsDropdown = this.studentsDropdown.bind(this);
  }
  async componentDidMount() {
    await this.props.fetchCampus(this.props.match.params.campusId);
    await this.props.fetchInitialStudents();
    await this.studentsDropdown(this.props.students);
  }

  studentsDropdown() {
    const studentOptions = this.props.students
      .filter(student => student.campusId !== this.props.selectedCampus.id)
      .map(student => {
        const name = student.firstName + ' ' + student.lastName;
        return {
          key: student.id,
          text: name,
          value: student.id,
          image: { avatar: true, src: student.imageUrl },
        };
      });
    this.setState({
      studentOptions,
    });
  }
  handleChange = (e, { value }) => {
    this.setState({ value });
  };

  render() {
    const { selectedCampus } = this.props;
    return (
      <Container textAlign="center" style={{ marginTop: '5rem' }}>
        <Grid
          container
          stackable
          verticalAlign="middle"
          style={{ marginTop: '2rem' }}
        >
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h1">{selectedCampus.name}</Header>
              <p>{selectedCampus.description}</p>
              <Button
                primary
                onClick={() => {
                  this.props.history.push(
                    `/campuses/${selectedCampus.id}/edit`
                  );
                }}
              >
                Edit
              </Button>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image
                bordered
                rounded
                size="large"
                src={selectedCampus.imageUrl}
              />
              <p style={{ margin: '1rem' }}>{selectedCampus.address}</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Container style={{ marginTop: '2rem' }}>
          <Divider style={{ margin: '1rem' }} horizontal>
            Students
          </Divider>
          <Container>
            <Dropdown
              placeholder="Add Student"
              selection
              noResultsMessage="No students found"
              options={this.state.studentOptions}
              onChange={this.handleChange}
              value={this.state.value}
            />
            <Button
              onClick={() => {
                this.props.updateStudentFromCampus({
                  id: this.state.value,
                  campusId: selectedCampus.id,
                });
              }}
            >
              Register Student
            </Button>
          </Container>
          <Container style={{ marginTop: '2rem' }}>
            <Card.Group itemsPerRow="6">
              {selectedCampus.students && selectedCampus.students.length !== 0
                ? selectedCampus.students.map(student => (
                    <StudentRow
                      key={student.id}
                      student={student}
                      updateStudentFromCampus={
                        this.props.updateStudentFromCampus
                      }
                    />
                  ))
                : 'No students on this campus'}
            </Card.Group>
          </Container>
        </Container>
      </Container>
    );
  }
}

const mapState = state => {
  return {
    selectedCampus: state.selectedCampus,
    students: state.students,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchCampus: campusId => dispatch(fetchSingleCampus(campusId, ownProps)),
    update: campus => dispatch(updateCampusThunk(campus)),
    updateStudentFromCampus: student =>
      dispatch(updateStudentFromCampusThunk(student)),
    fetchInitialStudents: () => dispatch(fetchStudentsThunk()),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedSingleCampus)
);
