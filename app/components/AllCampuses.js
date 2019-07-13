import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteCampusThunk } from '../redux/campuses';
import {
  fetchCampusesPaginationThunk,
  fetchCampusesFilterThunk,
} from '../redux/pagination';
import { Card, Container } from 'semantic-ui-react';
import { searchCampusesThunk } from '../redux/filteredCampuses';
import AllCampusesHeader from './AllCampusesHeader';
import CampusCard from './CampusCard';

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
    console.log('active', this.state.activePage);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    console.log('active', this.state.activePage);
    this.props.getPaginationCampuses(this.state.activePage);
  };

  render() {
    const campuses = this.props.paginatedCampuses.result;

    if (!campuses || campuses.length === 0) {
      return (
        <Container textAlign="center" style={{ marginTop: '5rem' }}>
          <AllCampusesHeader
            searchCampuses={this.props.searchCampuses}
            options={this.state.options}
            filterCampuses={this.props.filterCampuses}
            activePage={this.state.activePage}
            totalPages={this.state.totalPages}
            handlePaginationChange={this.handlePaginationChange}
          />
          <p>No Campuses Found</p>
        </Container>
      );
    }
    return (
      <Container textAlign="center" style={{ marginTop: '5rem' }}>
        <AllCampusesHeader
          searchCampuses={this.props.searchCampuses}
          options={this.state.options}
          filterCampuses={this.props.filterCampuses}
          activePage={this.state.activePage}
          totalPages={this.state.totalPages}
          handlePaginationChange={this.handlePaginationChange}
        />
        <Card.Group stackable itemsPerRow="3">
          {campuses.map(campus => (
            <CampusCard
              campus={campus}
              key={campus.id}
              deleteCampus={this.props.deleteCampus}
            />
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
    filterCampuses: (page, filter) =>
      dispatch(fetchCampusesFilterThunk(page, filter)),
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
