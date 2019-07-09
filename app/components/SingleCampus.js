import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchSingleCampus } from '../redux/singleCampus';

class DisconnectedSingleCampus extends React.Component {
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.campusId);
  }
  render() {
    const { selectedCampus } = this.props;
    return (
      <div>
        <div id="singleCampus">
          <div />
          <h1>Single Campus</h1>
          <div>
            <img src={selectedCampus.imageUrl} />
            <br />
            {selectedCampus.address}
          </div>
          <div>
            <h1>{selectedCampus.name}</h1>
            <p>{selectedCampus.description}</p>
          </div>
        </div>
        <div>
          <h1>Students on campus</h1>
          <div>
            {selectedCampus.students.length !== 0
              ? selectedCampus.students.map(student => {
                  return (
                    <div key={student.id}>
                      <NavLink
                        to={`/students/${student.id}`}
                        activeClassName="active"
                      >
                        <image src={student.imageUrl} />
                        {student.firstName} {student.lastName}
                      </NavLink>
                    </div>
                  );
                })
              : 'No students on this campus'}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    selectedCampus: state.selectedCampus,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchCampus: campusId => dispatch(fetchSingleCampus(campusId, ownProps)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedSingleCampus)
);
