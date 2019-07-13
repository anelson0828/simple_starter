import React from 'react';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleStudent from './SingleStudent';
import SingleCampus from './SingleCampus';
import CreateCampus from './CreateCampus';
import CreateStudent from './CreateStudent';
import Nav from './Nav';
import NotFound from './NotFound';
import HomepageLayout from './HomepageLayout';
import StudentForm from './StudentForm';
import CampusForm from './CampusForm';

import { fetchCampusesThunk } from '../redux/campuses';
import { fetchStudentsThunk } from '../redux/students';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

class DisconnectedRoot extends React.Component {
  componentDidMount() {
    this.props.fetchInitialCampuses();
    this.props.fetchInitialStudents();
  }
  render() {
    return (
      <Container>
        <Nav />
        <Switch>
          <Route exact path="/" component={HomepageLayout} />
          <Route exact path="/campuses" component={AllCampuses} />
          <Route exact path="/students" component={AllStudents} />
          <Route exact path="/campuses/new" component={CreateCampus} />
          <Route exact path="/students/new" component={CreateStudent} />
          <Route path="/campuses/:campusId/edit" component={CampusForm} />
          <Route path="/students/:studentId/edit" component={StudentForm} />
          <Route path="/campuses/:campusId" component={SingleCampus} />
          <Route path="/students/:studentId" component={SingleStudent} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Container>
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
    fetchInitialCampuses: () => dispatch(fetchCampusesThunk()),
    fetchInitialStudents: () => dispatch(fetchStudentsThunk()),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedRoot)
);
