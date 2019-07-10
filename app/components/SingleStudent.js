import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchSingleStudent, updateStudentThunk } from '../redux/singleStudent';
import { StudentForm } from './StudentForm';
import { Container, Header, Card, Image, Button } from 'semantic-ui-react';
import NotFound from './NotFound';

class DisconnectedSingleStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: '',
      gpa: 0.0,
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
      const student = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        imageUrl: this.state.imageUrl,
        gpa: this.state.gpa,
        id: this.props.selectedStudent.id,
      };
      this.props.update(student);
      this.setState({ editMode: false });
    } catch (error) {
      console.log('error', error.message);
      this.setState({ errorMessage: error.message });
    }
  }
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.studentId);
    this.setState({
      firstName: this.props.selectedStudent.firstName,
      lastName: this.props.selectedStudent.lastName,
      email: this.props.selectedStudent.email,
      imageUrl: this.props.selectedStudent.imageUrl,
      gpa: this.props.selectedStudent.gpa,
    });
  }
  render() {
    const { selectedStudent } = this.props;

    if (!selectedStudent.id) {
      return <NotFound />;
    } else if (this.state.editMode) {
      return (
        <StudentForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          state={this.state}
          history={this.props.history}
        />
      );
    } else {
      return (
        <Container textAlign="center" style={{ marginTop: '5rem' }}>
          <Header as="h2">
            <h1>Single Student</h1>
          </Header>

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
                  this.setState({ editMode: true });
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
