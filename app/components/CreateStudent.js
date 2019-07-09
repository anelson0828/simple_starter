import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudentThunk } from '../redux/students';
import { StudentForm } from './StudentForm';

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
      <StudentForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        state={this.state}
        history={this.props.history}
      />
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
