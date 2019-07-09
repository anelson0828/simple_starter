import axios from 'axios';

const SET_STUDENTS = 'SET_STUDENTS';

export const setStudents = students => {
  return { type: SET_STUDENTS, students };
};

export const fetchStudents = () => {
  return async dispatch => {
    const response = await axios.get('/api/students');
    const students = response.data;
    const action = setStudents(students);
    dispatch(action);
  };
};

export default (students = [], action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return action.students;
    default:
      return students;
  }
};
