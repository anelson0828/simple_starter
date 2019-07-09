import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampusThunk } from '../redux/campuses';
import { CampusForm } from './CampusForm';

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
    return (
      <CampusForm
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
    create: campus => {
      dispatch(createCampusThunk(campus));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DisconnectedCreateCampus);
