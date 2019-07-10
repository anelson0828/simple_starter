import React from 'react';
import {
  Container,
  Header,
  Card,
  Icon,
  Image,
  Form,
  Button,
  Message,
} from 'semantic-ui-react';

export const CampusForm = props => {
  return (
    <Container style={{ marginTop: '5rem' }}>
      <Header as="h2">Campus</Header>
      <Form onSubmit={props.handleSubmit} style={{ marginTop: '2rem' }}>
        <Form.Input
          label="Name"
          required
          name="name"
          value={props.state.name}
          onChange={props.handleChange}
        />
        <Form.Input
          label="Address"
          required
          name="address"
          value={props.state.address}
          onChange={props.handleChange}
        />
        <Form.TextArea
          label="Description"
          required
          name="description"
          value={props.state.description}
          onChange={props.handleChange}
        />
        {/* <Form.Input
          label="Image"
          name="imageUrl"
          value={props.state.imageUrl}
          onChange={props.handleChange}
          type="file"
          accept="image/*"
        /> */}
        <Button type="submit">Save</Button>
        <Button
          primary
          onClick={() => {
            props.history.goBack();
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
};
