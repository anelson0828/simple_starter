import axios from 'axios';

const SET_SINGLE_STUDENT = 'SET_SINGLE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

export const setSingleStudent = selectedStudent => {
  return { type: SET_SINGLE_STUDENT, selectedStudent };
};

export const updateStudent = student => {
  return { type: UPDATE_STUDENT, student };
};

export const fetchSingleStudent = (studentId, ownProps) => {
  return async dispatch => {
    const response = await axios.get(`/api/students/${studentId}`);
    const selectedStudent = response.data;
    dispatch(setSingleStudent(selectedStudent));
    ownProps.history.push(`/students/${selectedStudent.id}`);
  };
};

export const updateStudentThunk = student => {
  return async dispatch => {
    const response = await axios.put(`/api/students/${student.id}`, student);
    const updatedStudent = response.data;
    dispatch(updateStudent(updatedStudent));
  };
};

export default (selectedStudent = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_STUDENT:
      return action.selectedStudent;
    case UPDATE_STUDENT:
      return action.student;
    default:
      return selectedStudent;
  }
};
