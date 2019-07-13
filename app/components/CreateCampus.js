import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampusThunk } from '../redux/campuses';
import { Container, Header, Form, Button, Message } from 'semantic-ui-react';

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
      setTimeout(() => {
        this.props.history.push(`/campuses/${this.props.selectedCampus.id}`);
      }, 1000);
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
      <Container style={{ marginTop: '5rem' }}>
        <Header as="h2">Campus</Header>
        <Form onSubmit={this.handleSubmit} style={{ marginTop: '2rem' }}>
          <Form.Input
            label="Name"
            required
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Form.Input
            label="Address"
            required
            name="address"
            value={this.state.address}
            onChange={this.handleChange}
          />
          <Form.TextArea
            label="Description"
            required
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <Button primary type="submit">
            Create
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

const mapState = state => {
  return {
    selectedCampus: state.selectedCampus,
  };
};

const mapDispatch = dispatch => {
  return {
    create: campus => {
      dispatch(createCampusThunk(campus));
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(DisconnectedCreateCampus);
