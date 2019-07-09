import axios from 'axios';

const SET_STUDENTS = 'SET_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';

export const setStudents = students => {
  return { type: SET_STUDENTS, students };
};

export const createStudent = student => {
  return { type: CREATE_STUDENT, student };
};

export const deleteStudent = studentId => {
  return { type: DELETE_STUDENT, studentId };
};

export const fetchStudentsThunk = () => {
  return async dispatch => {
    const response = await axios.get('/api/students');
    const students = response.data;
    dispatch(setStudents(students));
  };
};

export const createStudentThunk = student => {
  return async dispatch => {
    const response = await axios.post('/api/students', student);
    const newStudent = response.data;
    dispatch(createStudent(newStudent));
  };
};

export const deleteStudentThunk = studentId => {
  return async dispatch => {
    await axios.delete(`/api/students/${studentId}`);
    dispatch(deleteStudent(studentId));
  };
};

export default (students = [], action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return action.students;
    case CREATE_STUDENT:
      return [...students, action.student];
    case DELETE_STUDENT:
      return students.filter(student => student.id !== action.studentId);
    default:
      return students;
  }
};
