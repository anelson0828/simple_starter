import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchSingleCampus, updateCampusThunk } from '../redux/singleCampus';
import { updateStudentThunk } from '../redux/singleStudent';
import { CampusForm } from './CampusForm';
import StudentRow from './StudentRow';

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
      name: '',
      address: '',
      imageUrl: '',
      description: '',
      errorMessage: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    try {
      event.preventDefault();
      const campus = {
        name: this.state.name,
        address: this.state.address,
        imageUrl: this.state.imageUrl,
        description: this.state.description,
        id: this.props.selectedCampus.id,
      };
      this.props.update(campus);
      this.setState({ editMode: false });
    } catch (error) {
      console.log('error', error.message);
      this.setState({ errorMessage: error.message });
    }
  }
  componentDidMount() {
    console.log('before fetch', this.props);

    this.props.fetchCampus(this.props.match.params.campusId);
    console.log('after fetch', this.props);
    this.setState({
      name: this.props.selectedCampus.name,
      address: this.props.selectedCampus.address,
      imageUrl: this.props.selectedCampus.imageUrl,
      description: this.props.selectedCampus.description,
    });
  }
  render() {
    const { selectedCampus } = this.props;

    if (this.state.editMode) {
      return (
        <CampusForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          state={this.state}
          selectedCampus={this.props.selectedCampus}
          history={this.props.history}
        />
      );
    } else {
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
    removeStudentFromCampus: student => dispatch(updateStudentThunk(student)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedSingleCampus)
);
