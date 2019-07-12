import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import {
  fetchSingleCampus,
  updateCampusThunk,
  updateStudentFromCampusThunk,
} from '../redux/singleCampus';
import CampusForm from './CampusForm';
import StudentRow from './StudentRow';
import NotFound from './NotFound';

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
import { fetchStudentsThunk } from '../redux/students';

class DisconnectedSingleCampus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      addStudents: [],
      value: 1,
    };
  }
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.campusId);
    this.setState({
      addStudents: this.props.students.map(student => {
        const name = student.firstName + ' ' + student.lastName;
        return {
          key: student.id,
          text: name,
          value: student.id,
          image: { avatar: true, src: student.imageUrl },
        };
      }),
    });
  }
  handleChange = (e, { value }) => {
    this.setState({ value });
  };

  render() {
    const { selectedCampus } = this.props;

    if (!selectedCampus.id) {
      return <NotFound />;
    }
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
              <p>{selectedCampus.address}</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Container style={{ marginTop: '2rem' }}>
          <Divider horizontal>Students</Divider>
          <Container>
            <Dropdown
              placeholder="Add Student"
              selection
              noResultsMessage="No students found"
              options={this.state.addStudents}
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
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedSingleCampus)
);
