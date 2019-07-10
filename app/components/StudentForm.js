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

export const StudentForm = props => {
  return (
    <Container style={{ marginTop: '5rem' }}>
      <Header as="h2">Student</Header>
      <Form onSubmit={props.handleSubmit} style={{ marginTop: '2rem' }}>
        <Form.Input
          label="First Name"
          required
          name="firstName"
          value={props.state.firstName}
          onChange={props.handleChange}
        />
        <Form.Input
          label="Last Name"
          required
          name="lastName"
          value={props.state.lastName}
          onChange={props.handleChange}
        />
        <Form.Input
          label="Email"
          required
          name="email"
          value={props.state.email}
          onChange={props.handleChange}
        />
        <Form.Input
          label="GPA"
          name="gpa"
          value={props.state.gpa}
          onChange={props.handleChange}
        />
        <Form.Input
          label="Image"
          name="imageUrl"
          value={props.state.imageUrl}
          onChange={props.handleChange}
          type="file"
          accept="image/*"
        />
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
