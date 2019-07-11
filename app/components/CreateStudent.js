import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudentThunk } from '../redux/students';
import { Container, Header, Form, Button, Message } from 'semantic-ui-react';

class DisconnectedCreateStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      const campus = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        imageUrl: this.state.imageUrl,
        gpa: this.state.gpa,
      };
      this.props.create(campus);
      this.setState({
        firstName: '',
        lastName: '',
        email: '',
        imageUrl: '',
        gpa: 0.0,
        errorMessage: '',
      });
    } catch (error) {
      console.log('error', error.message);
      this.setState({ errorMessage: error.message });
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
          {/* <Form.Input
          label="Image"
          name="imageUrl"
          value={props.state.imageUrl}
          onChange={props.handleChange}
          type="file"
          accept="image/*"
        /> */}
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
          <Message
            error
            header="Error"
            content="Looks like there's a problem with your submission. Please try again."
          />
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    create: student => {
      dispatch(createStudentThunk(student));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DisconnectedCreateStudent);
