import React from 'react';
import { Container, Header, Form, Button, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateStudentThunk } from '../redux/singleStudent';

class DisconnectedStudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.selectedStudent.firstName,
      lastName: this.props.selectedStudent.lastName,
      email: this.props.selectedStudent.email,
      imageUrl: this.props.selectedStudent.imageUrl,
      gpa: this.props.selectedStudent.gpa,
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
    } catch (error) {
      console.log('error', error.message);
    }
  }

  render() {
    return (
      <Container style={{ marginTop: '5rem' }}>
        <Header as="h2">Student</Header>
        <Form onSubmit={this.handleSubmit} style={{ marginTop: '2rem' }}>
          <Form.Input
            label="First Name"
            required
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <Form.Input
            label="Last Name"
            required
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
          <Form.Input
            label="Email"
            required
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Form.Input
            label="GPA"
            name="gpa"
            value={this.state.gpa}
            onChange={this.handleChange}
          />
          <Button primary type="submit">
            Save
          </Button>
          <Button
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            Back
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapState = state => {
  return {
    selectedStudent: state.selectedStudent,
  };
};

const mapDispatch = dispatch => {
  return {
    update: student => dispatch(updateStudentThunk(student)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedStudentForm)
);
