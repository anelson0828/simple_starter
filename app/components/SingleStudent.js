import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Route } from 'react-router-dom';
import { fetchSingleStudent, updateStudentThunk } from '../redux/singleStudent';
import StudentForm from './StudentForm';
import { Container, Header, Card, Image, Button } from 'semantic-ui-react';
import NotFound from './NotFound';

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
    if (!selectedStudent.id) {
      return <NotFound />;
    }
    return (
      <Container textAlign="center" style={{ marginTop: '5rem' }}>
        <Header as="h2">Single Student</Header>

        <Card>
          <Image src={selectedStudent.imageUrl} wrapped ui={false} />
          <Card.Content>
            <Card.Header>
              {selectedStudent.firstName} {selectedStudent.lastName}
            </Card.Header>
            <Card.Description>
              <strong>Email:</strong> {selectedStudent.email}
              <br />
              <strong>GPA:</strong> {selectedStudent.gpa}
              <br />
              {selectedStudent.campus ? (
                <NavLink
                  to={`/campuses/${selectedStudent.campus.id}`}
                  activeClassName="active"
                >
                  {selectedStudent.campus.name}
                </NavLink>
              ) : (
                'This student does not have a campus.'
              )}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button
              primary
              onClick={() => {
                this.props.history.push(`/students/${selectedStudent.id}/edit`);
              }}
            >
              Edit
            </Button>
          </Card.Content>
        </Card>
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
