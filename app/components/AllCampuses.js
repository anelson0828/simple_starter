import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchCampusesThunk, deleteCampusThunk } from '../redux/campuses';

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
          <li key={campus.id}>
            <NavLink to={`/campuses/${campus.id}`} activeClassName="active">
              {campus.name}
            </NavLink>
            <button
              type="button"
              className="remove"
              onClick={() => {
                props.deleteCampus(campus.id);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <button type="button">
        <NavLink to="/campuses/new">Add Campus</NavLink>
      </button>
    </div>
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
