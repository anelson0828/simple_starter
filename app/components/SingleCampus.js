import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import {
  fetchSingleCampus,
  updateCampusThunk,
  unregisterStudentThunk,
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

class DisconnectedSingleCampus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      addStudents: [],
    };
  }
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.campusId);

    this.setState({
      addStudents: [
        this.props.addStudents.map(student => {
          return {
            key: student.name,
            text: student.name,
            value: student.name,
            image: { avatar: true, src: student.imageUrl },
          };
        }),
      ],
    });
    console.log(this.state.addStudents);
  }
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
          <Dropdown
            placeholder="Add Student"
            fluid
            selection
            options={this.state.addStudents}
          />
          <Card.Group itemsPerRow="6">
            {selectedCampus.students && selectedCampus.students.length !== 0
              ? selectedCampus.students.map(student => (
                  <StudentRow
                    key={student.id}
                    student={student}
                    removeStudentFromCampus={this.props.removeStudentFromCampus}
                  />
                ))
              : 'No students on this campus'}
          </Card.Group>
        </Container>
      </Container>
    );
  }
}

const mapState = state => {
  return {
    selectedCampus: state.selectedCampus,
    addStudents: state.students,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchCampus: campusId => dispatch(fetchSingleCampus(campusId, ownProps)),
    update: campus => dispatch(updateCampusThunk(campus)),
    removeStudentFromCampus: student =>
      dispatch(unregisterStudentThunk(student)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedSingleCampus)
);
