import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampusThunk } from '../redux/campuses';

class DisconnectedCreateCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      description: '',
      imageUrl: '',
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
        description: this.state.description,
        imageUrl: this.state.imageUrl,
      };
      this.props.create(campus);
      this.setState({
        name: '',
        address: '',
        description: '',
        imageUrl: '',
        errorMessage: '',
      });
    } catch (error) {
      console.log('error', error.message);
      this.setState({ errorMessage: error.message });
    }
  }

  render() {
    const { name, address, description, imageUrl } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">
          Campus Name:
          {/* {!campus.name.length ? (
            <span className="warning">Field Required</span>
          ) : (
            <span />
          )} */}
        </label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="address">Address:</label>
        <input
          name="address"
          type="text"
          value={address}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <input
          name="description"
          type="text"
          value={description}
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
    create: campus => {
      dispatch(createCampusThunk(campus));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DisconnectedCreateCampus);
