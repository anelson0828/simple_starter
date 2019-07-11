import React from 'react';
import { Container, Header, Form, Button, Message } from 'semantic-ui-react';

class CampusForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: true,
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
      this.setState({ editMode: false });
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

export default CampusForm;
