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
} from 'semantic-ui-react';

class DisconnectedSingleCampus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      errorMessage: '',
    };
  }
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.campusId);
  }
  render() {
    const { selectedCampus } = this.props;

    if (!selectedCampus.id) {
      return <NotFound />;
    } else if (this.state.editMode) {
      return (
        <CampusForm
          selectedCampus={selectedCampus}
          update={this.props.update}
        />
      );
    }
    return (
      <Container textAlign="center" style={{ marginTop: '5rem' }}>
        <Header as="h2">Single Campus</Header>
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
                onClick={() => {
                  this.setState({ editMode: true });
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
        <Divider horizontal style={{ marginTop: '2rem' }}>
          Students
        </Divider>
        <Card.Group itemsPerRow="6">
          {selectedCampus.students.length !== 0
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
    );
  }
}

const mapState = state => {
  return {
    selectedCampus: state.selectedCampus,
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
