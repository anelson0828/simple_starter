import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchSingleStudent, updateStudentThunk } from '../redux/singleStudent';
import { StudentForm } from './StudentForm';

class DisconnectedSingleStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: '',
      gpa: 0.0,
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
      const student = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        imageUrl: this.state.imageUrl,
        gpa: this.state.gpa,
        id: this.props.selectedStudent.id,
      };
      this.props.update(student);
      this.setState({ editMode: false });
    } catch (error) {
      console.log('error', error.message);
      this.setState({ errorMessage: error.message });
    }
  }
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.studentId);
    this.setState({
      firstName: this.props.selectedStudent.firstName,
      lastName: this.props.selectedStudent.lastName,
      email: this.props.selectedStudent.email,
      imageUrl: this.props.selectedStudent.imageUrl,
      gpa: this.props.selectedStudent.gpa,
    });
  }
  render() {
    const { selectedStudent } = this.props;

    if (this.state.editMode) {
      return (
        <StudentForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          state={this.state}
          history={this.props.history}
        />
      );
    } else {
      return (
        <div id="singleStudent">
          <h1>Single Student</h1>
          <div>
            <img src={selectedStudent.imageUrl} />
          </div>
          <div>
            <h2>
              {selectedStudent.firstName} {selectedStudent.lastName}
            </h2>
            Email: {selectedStudent.email}
            <br />
            GPA: {selectedStudent.gpa}
            <button
              type="button"
              onClick={() => {
                this.setState({ editMode: true });
              }}
            >
              Edit
            </button>
          </div>
          <div>
            <h3>
              {selectedStudent.campus ? (
                <NavLink
                  to={`/campuses/${selectedStudent.campus.id}`}
                  activeClassName="active"
                >
                  {selectedStudent.campus.name}
                </NavLink>
              ) : (
                'This student does not have a campus.'
              )}
            </h3>
          </div>
        </div>
      );
    }
  }
}

const mapState = state => {
  return {
    selectedStudent: state.selectedStudent,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchStudent: studentId =>
      dispatch(fetchSingleStudent(studentId, ownProps)),
    update: student => dispatch(updateStudentThunk(student)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedSingleStudent)
);
