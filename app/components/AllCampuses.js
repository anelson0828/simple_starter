import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSingleCampus } from '../redux/singleCampus';
import { fetchCampuses } from '../redux/campuses';

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
    <div>
      <h1>All Campuses</h1>
      <ul className="campus-list">
        {props.campuses.map(campus => (
          <li key={campus.id} onClick={() => props.fetchCampus(campus.id)}>
            {campus.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapState = state => {
  return {
    campuses: state.campuses,
    selectedCampus: state.selectedCampus,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchInitialCampuses: () => dispatch(fetchCampuses()),
    fetchCampus: campusId => dispatch(fetchSingleCampus(campusId, ownProps)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedAllCampuses)
);
