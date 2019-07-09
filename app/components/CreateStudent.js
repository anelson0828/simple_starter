import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudentThunk } from '../redux/students';

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
    const { firstName, lastName, email, gpa, imageUrl } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="firstName">
          First Name:
          {/* {!campus.name.length ? (
            <span className="warning">Field Required</span>
          ) : (
            <span />
          )} */}
        </label>
        <input
          name="firstName"
          type="text"
          value={firstName}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="lastName">Last Name:</label>
        <input
          name="lastName"
          type="text"
          value={lastName}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="text"
          value={email}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="gpa">GPA:</label>
        <input
          name="gpa"
          type="float"
          value={gpa}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="imageUrl">Image:</label>
        <input
          name="imageUrl"
          type="file"
          accept="image/*"
          value={imageUrl}
          onChange={this.handleChange}
        />
        <br />
        <button type="submit">Submit</button>
        {this.state.errorMessage ? (
          <div className="error">Yikes! Looks like you got an error!</div>
        ) : (
          ''
        )}
      </form>
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
