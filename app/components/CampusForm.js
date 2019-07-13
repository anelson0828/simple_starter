import React from 'react';
import { Container, Header, Form, Button, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCampusThunk } from '../redux/singleCampus';

class DisconnectedCampusForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.selectedCampus.name,
      address: this.props.selectedCampus.address,
      imageUrl: this.props.selectedCampus.imageUrl,
      description: this.props.selectedCampus.description,
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
        imageUrl: this.state.imageUrl,
        description: this.state.description,
        id: this.props.selectedCampus.id,
      };
      this.props.update(campus);
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

const mapState = state => {
  return {
    selectedCampus: state.selectedCampus,
  };
};

const mapDispatch = dispatch => {
  return {
    update: campus => dispatch(updateCampusThunk(campus)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedCampusForm)
);
