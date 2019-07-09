import React from 'react';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import { fetchCampuses } from '../redux/campuses';
import { fetchStudents } from '../redux/students';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter, NavLink } from 'react-router-dom';

class DisconnectedRoot extends React.Component {
  componentDidMount() {
    this.props.fetchInitialStudents();
    this.props.fetchInitialCampuses();
  }
  render() {
    const { campuses, students } = this.props;

    return (
      <div>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/campuses/">Campuses</NavLink>
          <NavLink to="/students/">Students</NavLink>
        </nav>
        <main>
          <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
          <Switch>
            <Route
              path="/campuses"
              render={() => <AllCampuses campuses={campuses} />}
            />
            <Route
              path="/students"
              render={() => <AllStudents students={students} />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapState = state => {
  return {
    students: state.students,
    campuses: state.campuses,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchInitialStudents: () => dispatch(fetchCampuses()),
    fetchInitialCampuses: () => dispatch(fetchStudents()),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedRoot)
);
