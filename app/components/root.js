import React from 'react';
import AllStudents from './AllStudents';
import SingleStudent from './SingleStudent';

import CreateStudent from './CreateStudent';
import Nav from './Nav';
import NotFound from './NotFound';
import HomepageLayout from './HomepageLayout';
import StudentForm from './StudentForm';

import { fetchStudentsThunk } from '../redux/students';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

class DisconnectedRoot extends React.Component {
  componentDidMount() {
    this.props.fetchInitialStudents();
  }
  render() {
    return (
      <Container>
        <Nav />
        <Switch>
          <Route exact path="/" component={HomepageLayout} />
          <Route exact path="/students" component={AllStudents} />
          <Route exact path="/students/new" component={CreateStudent} />
          <Route path="/students/:studentId/edit" component={StudentForm} />
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
  };
};

const mapDispatch = dispatch => {
  return {
    fetchInitialStudents: () => dispatch(fetchStudentsThunk()),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedRoot)
);
