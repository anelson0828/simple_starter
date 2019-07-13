import React from 'react';
import {
  Button,
  Container,
  Header,
  Dropdown,
  Input,
  Pagination,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const AllCampusesHeader = props => (
  <Container>
    <Header as="h2">All Campuses</Header>
    <Container textAlign="center" style={{ marginBottom: '2rem' }}>
      <NavLink to="/campuses/new">
        <Button primary>Add Campus</Button>
      </NavLink>
    </Container>
    <Container textAlign="center" style={{ marginBottom: '1rem' }}>
      <Input
        style={{ margin: '1rem' }}
        action={{ icon: 'search' }}
        placeholder="Search..."
        onChange={props.searchCampuses}
      />
      <Dropdown
        style={{ margin: '1rem' }}
        placeholder="Filter"
        search
        clearable
        options={props.options}
        selection
        onChange={props.filterCampuses}
      />
      <Container textAlign="center" style={{ margin: '1rem' }}>
        <Pagination
          activePage={props.activePage}
          onPageChange={props.handlePaginationChange}
          totalPages={props.totalPages}
        />
      </Container>
    </Container>
  </Container>
);

export default AllCampusesHeader;
