import React from 'react';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleStudent from './SingleStudent';
import SingleCampus from './SingleCampus';
import { CreateCampus } from './CreateCampus';
import { CreateStudent } from './CreateStudent';

import { fetchCampusesThunk } from '../redux/campuses';
import { fetchStudentsThunk } from '../redux/students';
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
              exact
              path="/campuses"
              render={() => <AllCampuses campuses={campuses} />}
            />
            <Route
              exact
              path="/students"
              render={() => <AllStudents students={students} />}
            />
            <Route exact path="/campuses/new" component={CreateStudent} />
            <Route exact path="/students/new" component={CreateCampus} />
            <Route path="/campuses/:campusId" component={SingleCampus} />
            <Route path="/students/:studentId" component={SingleStudent} />
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
    fetchInitialStudents: () => dispatch(fetchCampusesThunk()),
    fetchInitialCampuses: () => dispatch(fetchStudentsThunk()),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedRoot)
);
