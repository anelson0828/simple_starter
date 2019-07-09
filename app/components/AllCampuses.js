import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchCampuses } from '../redux/campuses';
import CreateCampus from './CreateCampus';

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
          </li>
        ))}
      </ul>
      <CreateCampus />
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
    fetchInitialCampuses: () => dispatch(fetchCampuses()),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedAllCampuses)
);
