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
} from 'semantic-ui-react';

const DisconnectedAllCampuses = props => {
  if (props.campuses.length === 0) {
    return (
      <div>
        <h1>All Campuses</h1>
        <p>There are no campuses registered in the database.</p>
      </div>
    );
  }
  return (
    <Container textAlign="center" style={{ marginTop: '5rem' }}>
      <Header as="h2">
        <h1>All Campuses</h1>
      </Header>
      <Container textAlign="center" style={{ marginBottom: '2rem' }}>
        <NavLink to="/campus/new">
          <Button primary>Add Campus</Button>
        </NavLink>
      </Container>
      <Card.Group stackable itemsPerRow="2">
        {props.campuses.map(campus => (
          <NavLink to={`/campuses/${campus.id}`} key={campus.id}>
            <Card raised key={campus.id} style={{ margin: '1rem' }}>
              <Image size="medium" src={campus.imageUrl} />
              <Card.Content>
                <Card.Header>{campus.name}</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Button
                  icon
                  onClick={() => {
                    props.deleteCampus(campus.id);
                  }}
                >
                  <Icon name="delete" />
                </Button>
              </Card.Content>
            </Card>
          </NavLink>
        ))}
      </Card.Group>
    </Container>
  );
};

const mapState = state => {
  return {
    campuses: state.campuses,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchInitialCampuses: () => dispatch(fetchCampusesThunk()),
    deleteCampus: campusId => dispatch(deleteCampusThunk(campusId)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedAllCampuses)
);
