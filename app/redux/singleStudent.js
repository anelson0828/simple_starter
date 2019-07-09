import axios from 'axios';

const SET_SINGLE_STUDENT = 'SET_SINGLE_STUDENT';

export const setSingleStudent = selectedStudent => {
  return { type: SET_SINGLE_STUDENT, selectedStudent };
};

export const fetchSingleStudent = (studentId, ownProps) => {
  return async dispatch => {
    const response = await axios.get(`/api/students/${studentId}`);
    const selectedStudent = response.data;
    const action = setSingleStudent(selectedStudent);
    dispatch(action);
    ownProps.history.push(`/students/${selectedStudent.id}`);
  };
};

export default (selectedStudent = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_STUDENT:
      return action.selectedStudent;
    default:
      return selectedStudent;
  }
};
