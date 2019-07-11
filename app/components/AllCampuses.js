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
} from 'semantic-ui-react';

class DisconnectedAllCampuses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campuses: [],
      searchActive: false,
    };
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    this.setState({
      campuses: this.props.campuses,
    });
  }
  search(event) {
    if (event.target.value.length) {
      this.setState({ searchActive: true });
      const campuses = this.props.campuses.filter(campus => {
        return (
          campus.name.toLowerCase().search(event.target.value.toLowerCase()) !==
          -1
        );
      });
      this.setState({
        campuses,
      });
    } else {
      this.setState({ searchActive: false });
    }
  }

  render() {
    if (this.props.campuses.length === 0) {
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
            onChange={this.search}
          />
        </Container>
        <Card.Group stackable itemsPerRow="3">
          {this.state.campuses.map(campus => (
            <Card raised key={campus.id} style={{ margin: '1rem' }}>
              <NavLink to={`/campuses/${campus.id}`} key={campus.id}>
                <Image centered size="medium" src={campus.imageUrl} />
              </NavLink>
              <Card.Content>
                <Card.Header>{campus.name}</Card.Header>
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
