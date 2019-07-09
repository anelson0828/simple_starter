import axios from 'axios';

const SET_STUDENTS = 'SET_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';

export const setStudents = students => {
  return { type: SET_STUDENTS, students };
};

export const createStudent = student => {
  return { type: CREATE_STUDENT, student };
};

export const fetchStudents = () => {
  return async dispatch => {
    const response = await axios.get('/api/students');
    const students = response.data;
    const action = setStudents(students);
    dispatch(action);
  };
};

export const createStudentThunk = student => {
  return async dispatch => {
    const response = await axios.post('/api/students', student);
    const newStudent = response.data;
    const action = createStudent(newStudent);
    dispatch(action);
  };
};

export default (students = [], action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return action.students;
    case CREATE_STUDENT:
      return [...students, action.student];
    default:
      return students;
  }
};
