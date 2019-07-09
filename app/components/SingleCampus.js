import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchSingleCampus, updateCampusThunk } from '../redux/singleCampus';
import { updateStudentThunk } from '../redux/singleStudent';
import { CampusForm } from './CampusForm';

class DisconnectedSingleCampus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      name: '',
      address: '',
      imageUrl: '',
      description: '',
      errorMessage: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    try {
      event.preventDefault();
      const campus = {
        name: this.state.name,
        address: this.state.address,
        imageUrl: this.state.imageUrl,
        description: this.state.description,
        id: this.props.selectedCampus.id,
      };
      this.props.update(campus);
      this.setState({ editMode: false });
    } catch (error) {
      console.log('error', error.message);
      this.setState({ errorMessage: error.message });
    }
  }
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.campusId);
    this.setState({
      name: this.props.selectedCampus.name,
      address: this.props.selectedCampus.address,
      imageUrl: this.props.selectedCampus.imageUrl,
      description: this.props.selectedCampus.description,
    });
  }
  render() {
    const { selectedCampus } = this.props;

    if (this.state.editMode) {
      return (
        <CampusForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          state={this.state}
          history={this.props.history}
        />
      );
    } else {
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
              <button
                type="button"
                onClick={() => {
                  this.setState({ editMode: true });
                }}
              >
                Edit
              </button>
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
                          <button
                            type="button"
                            onClick={() => {
                              this.props.removeStudentFromCampus({
                                id: student.id,
                                campusId: null,
                              });
                            }}
                          >
                            Unregister
                          </button>
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
}

const mapState = state => {
  return {
    selectedCampus: state.selectedCampus,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchCampus: campusId => dispatch(fetchSingleCampus(campusId, ownProps)),
    update: campus => dispatch(updateCampusThunk(campus)),
    removeStudentFromCampus: student => dispatch(updateStudentThunk(student)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedSingleCampus)
);
