import axios from 'axios';

import { SET_STUDENTS, CREATE_STUDENT, DELETE_STUDENT } from './students';

const FILTER_STUDENTS = 'FILTER_STUDENTS';
const SORT_STUDENTS = 'SORT_STUDENTS';

export const filterStudents = filteredStudents => {
  return { type: FILTER_STUDENTS, filteredStudents };
};

export const sortStudents = sortedStudents => {
  return { type: SORT_STUDENTS, sortedStudents };
};

export const filterStudentsThunk = event => {
  const filter = event.target.innerText;
  return (dispatch, getState) => {
    const { students } = getState();
    if (filter === 'Has Campus') {
      const filteredStudents = students.filter(student => student.campusId);
      dispatch(filterStudents(filteredStudents));
    } else if (filter === 'No Campus') {
      const filteredStudents = students.filter(student => !student.campusId);
      dispatch(filterStudents(filteredStudents));
    } else {
      dispatch(filterStudents(students));
    }
  };
};

export const searchStudentsThunk = event => {
  const filter = event.target.value.toLowerCase();

  return (dispatch, getState) => {
    const { students } = getState();
    const filteredStudents = students.filter(student => {
      const name = `${student.firstName} ${student.lastName}`;
      return name.toLowerCase().search(filter) !== -1;
    });
    dispatch(filterStudents(filteredStudents));
  };
};

export const sortStudentsThunk = event => {
  let key = event.target.innerText
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
      if (+match === 0) return '';
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  if (!key) {
    key = 'id';
  }
  return async dispatch => {
    const response = await axios.get(`/api/students/sorted/${key}`);
    const sortedStudents = response.data;
    dispatch(sortStudents(sortedStudents));
  };
};

export default (filteredStudents = [], action) => {
  switch (action.type) {
    case FILTER_STUDENTS:
      return action.filteredStudents;
    case SET_STUDENTS:
      return action.students;
    case SORT_STUDENTS:
      return action.sortedStudents;
    case CREATE_STUDENT:
      return [...filteredStudents, action.student];
    case DELETE_STUDENT:
      return filteredStudents.filter(
        student => student.id !== action.studentId
      );
    default:
      return filteredStudents;
  }
};
