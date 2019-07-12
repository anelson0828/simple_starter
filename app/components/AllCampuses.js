import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchCampusesThunk, deleteCampusThunk } from '../redux/campuses';
import { fetchCampusesPaginationThunk } from '../redux/pagination';
import {
  Button,
  Card,
  Image,
  Container,
  Header,
  Icon,
  Input,
  Dropdown,
  Pagination,
} from 'semantic-ui-react';
import {
  filterCampusesThunk,
  searchCampusesThunk,
} from '../redux/filteredCampuses';
import PaginationBar from './Pagination';

class DisconnectedAllCampuses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { key: 1, text: 'Has Students', value: 1 },
        { key: 2, text: 'No Students', value: 2 },
      ],
      activePage: 1,
      totalPages: 1,
    };
  }
  async componentDidMount() {
    await this.props.getPaginationCampuses(this.state.activePage);
    this.setState({ totalPages: this.props.paginatedCampuses.pages });
  }

  handlePaginationChange = (e, { activePage }) => {
    console.log('page changes e', e);
    console.log('page changes activepage', activePage);
    this.setState({ activePage });
    this.props.getPaginationCampuses(this.state.activePage);
  };

  render() {
    const campuses = this.props.paginatedCampuses.result;
    console.log(campuses);
    const { activePage, totalPages } = this.state;
    console.log('total pages', totalPages);
    if (!campuses || campuses.length === 0) {
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
            <br />
            <p>No Campuses Found</p>
          </Container>
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
          <Pagination
            activePage={activePage}
            onPageChange={this.handlePaginationChange}
            totalPages={totalPages}
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
    paginatedCampuses: state.paginatedCampuses,
  };
};

const mapDispatch = dispatch => {
  return {
    deleteCampus: campusId => dispatch(deleteCampusThunk(campusId)),
    filterCampuses: event => dispatch(filterCampusesThunk(event)),
    searchCampuses: event => dispatch(searchCampusesThunk(event)),
    getPaginationCampuses: page => dispatch(fetchCampusesPaginationThunk(page)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedAllCampuses)
);
