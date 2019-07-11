import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchCampusesThunk, deleteCampusThunk } from '../redux/campuses';
import {
  Button,
  Card,
  Image,
  Container,
  Header,
  Icon,
  Input,
  Dropdown,
} from 'semantic-ui-react';
import {
  filterCampusesThunk,
  searchCampusesThunk,
} from '../redux/filteredCampuses';

class DisconnectedAllCampuses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { key: 1, text: 'Has Students', value: 1 },
        { key: 2, text: 'No Students', value: 2 },
      ],
    };
  }

  render() {
    const campuses = this.props.filteredCampuses;

    if (campuses.length === 0) {
      return (
        <Container textAlign="center" style={{ marginTop: '5rem' }}>
          <Header as="h2">All Campuses</Header>
          <p>There are no campuses registered in the database.</p>
        </Container>
      );
    }
    return (
      <Container textAlign="center" style={{ marginTop: '5rem' }}>
        <Header as="h2">All Campuses</Header>
        <Container textAlign="center" style={{ marginBottom: '2rem' }}>
          <NavLink to="/campuses/new">
            <Button primary>Add Campus</Button>
          </NavLink>
          <Input
            action={{ icon: 'search' }}
            placeholder="Search..."
            onChange={this.props.searchCampuses}
          />
          <Dropdown
            placeholder="Filter"
            search
            clearable
            options={this.state.options}
            selection
            onChange={this.props.filterCampuses}
          />
        </Container>
        <Card.Group stackable itemsPerRow="3">
          {campuses.map(campus => (
            <Card raised key={campus.id} style={{ margin: '1rem' }}>
              <NavLink to={`/campuses/${campus.id}`} key={campus.id}>
                <Image centered size="medium" src={campus.imageUrl} />
              </NavLink>
              <Card.Content>
                <NavLink to={`/campuses/${campus.id}`} key={campus.id}>
                  <Card.Header>{campus.name}</Card.Header>
                </NavLink>
              </Card.Content>
              <Card.Content extra>
                <Button
                  icon
                  onClick={() => {
                    this.props.deleteCampus(campus.id);
                  }}
                >
                  <Icon name="delete" />
                </Button>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Container>
    );
  }
}

const mapState = state => {
  return {
    campuses: state.campuses,
    filteredCampuses: state.filteredCampuses,
  };
};

const mapDispatch = dispatch => {
  return {
    deleteCampus: campusId => dispatch(deleteCampusThunk(campusId)),
    filterCampuses: event => dispatch(filterCampusesThunk(event)),
    searchCampuses: event => dispatch(searchCampusesThunk(event)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedAllCampuses)
);
