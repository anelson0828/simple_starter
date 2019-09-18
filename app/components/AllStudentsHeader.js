import React from 'react';
import { Button, Container, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const AllStudentsHeader = () => (
  <Container>
    <Header as="h2">All Students</Header>
    <Container textAlign="center" style={{ marginBottom: '2rem' }}>
      <NavLink to="/students/new">
        <Button primary>Add Student</Button>
      </NavLink>
    </Container>
  </Container>
);

export default AllStudentsHeader;
