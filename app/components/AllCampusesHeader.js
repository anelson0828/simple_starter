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
      <Dropdown
        style={{ margin: '1rem' }}
        placeholder="Filter"
        search
        clearable
        options={props.options}
        selection
        onChange={event => {
          let filter = event.target.innerText
            .toLowerCase()
            .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
              if (+match === 0) return '';
              return index === 0 ? match.toLowerCase() : match.toUpperCase();
            });
          props.filterCampuses(props.activePage, filter);
        }}
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
