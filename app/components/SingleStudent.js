import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchSingleStudent, updateStudentThunk } from '../redux/singleStudent';
import {
  Container,
  Header,
  Card,
  Image,
  Button,
  Divider,
  Grid,
} from 'semantic-ui-react';
import CampusCard from './CampusCard';

class DisconnectedSingleStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      loading: true,
    };
  }
  componentDidMount() {
    this.setState({ loading: false });
    this.props.fetchStudent(this.props.match.params.studentId);
    this.setState({ loading: false });
  }
  render() {
    const { selectedStudent } = this.props;

    if (this.state.loading) {
      return (
        <Container textAlign="center" style={{ marginTop: '5rem' }}>
          <Header as="h2">Loading</Header>
        </Container>
      );
    }

    return (
      <Container textAlign="center" style={{ marginTop: '5rem' }}>
        <Header as="h2">Single Student</Header>

        <Grid
          container
          stackable
          verticalAlign="middle"
          style={{ marginTop: '2rem' }}
        >
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h1">
                {selectedStudent.firstName + ' ' + selectedStudent.lastName}
              </Header>
              <p>
                {selectedStudent.gpa}
                <br />
                {selectedStudent.email}
              </p>
              <Button
                primary
                onClick={() => {
                  this.props.history.push(
                    `/students/${selectedStudent.id}/edit`
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
                src={selectedStudent.imageUrl}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Container style={{ marginTop: '2rem' }}>
          <Divider style={{ margin: '1rem' }} horizontal>
            Campus
          </Divider>
          {selectedStudent.campus ? (
            <Container className="centered">
              <CampusCard campus={selectedStudent.campus} />
            </Container>
          ) : (
            'This student does not have a campus.'
          )}
        </Container>
      </Container>
    );
  }
}

const mapState = state => {
  return {
    selectedStudent: state.selectedStudent,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchStudent: studentId =>
      dispatch(fetchSingleStudent(studentId, ownProps)),
    update: student => dispatch(updateStudentThunk(student)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedSingleStudent)
);
