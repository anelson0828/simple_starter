import React from 'react';
import { Button, Container, Header, Dropdown, Input } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const AllStudentsHeader = props => (
  <Container>
    <Header as="h2">All Students</Header>
    <Container textAlign="center" style={{ marginBottom: '2rem' }}>
      <NavLink to="/students/new">
        <Button primary>Add Student</Button>
      </NavLink>
    </Container>
    <Container textAlign="center" style={{ marginBottom: '1rem' }}>
      <Input
        style={{ margin: '1rem' }}
        action={{ icon: 'search' }}
        placeholder="Search..."
        onChange={props.searchStudents}
      />
      <Dropdown
        style={{ margin: '1rem' }}
        placeholder="Filter"
        search
        clearable
        options={props.options}
        selection
        onChange={props.filterStudents}
      />
      <Dropdown
        style={{ margin: '1rem' }}
        placeholder="Sort by..."
        search
        clearable
        options={[
          { key: 1, text: 'First Name', value: 'firstName' },
          { key: 2, text: 'Last Name', value: 'lastName' },
          { key: 3, text: 'GPA', value: 'gpa' },
        ]}
        selection
        onChange={props.sort}
      />
    </Container>
  </Container>
);

export default AllStudentsHeader;
