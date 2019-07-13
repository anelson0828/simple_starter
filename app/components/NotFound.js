import React from 'react';
import { Container, Header, Image } from 'semantic-ui-react';

const NotFound = () => {
  return (
    <Container style={{ marginTop: '5rem' }}>
      <Header as="h2">Well this is embarrassing....</Header>
      <Image size="large" src="/An-embarrassed-dog.jpg" />
      <h3>
        Looks like you're a bit lost. Use the navigation menu at the top to find
        your way back to safety.
      </h3>
    </Container>
  );
};

export default NotFound;
