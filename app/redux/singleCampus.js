import axios from 'axios';
import { CREATE_CAMPUS } from './campuses';

const SET_SINGLE_CAMPUS = 'SET_SINGLE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const UPDATE_STUDENT_FROM_CAMPUS = 'UPDATE_STUDENT_FROM_CAMPUS';

export const setSingleCampus = selectedCampus => {
  return { type: SET_SINGLE_CAMPUS, selectedCampus };
};

export const updateCampus = campus => {
  return { type: UPDATE_CAMPUS, campus };
};

export const updateStudent = (student, updatedStudent) => {
  console.log('updated student 2', updatedStudent);
  return { type: UPDATE_STUDENT_FROM_CAMPUS, student, updatedStudent };
};

export const fetchSingleCampus = (campusId, ownProps) => {
  return async dispatch => {
    const response = await axios.get(`/api/campuses/${campusId}`);
    const selectedCampus = response.data;
    const action = setSingleCampus(selectedCampus);
    dispatch(action);
    // ownProps.history.push(`/campuses/${selectedCampus.id}`);
  };
};

export const updateCampusThunk = campus => {
  return async dispatch => {
    const response = await axios.put(`/api/campuses/${campus.id}`, campus);
    const updatedCampus = response.data;
    dispatch(updateCampus(updatedCampus));
  };
};

export const updateStudentFromCampusThunk = student => {
  return async dispatch => {
    const updatedStudent = await axios.put(
      `/api/students/${student.id}`,
      student
    );
    console.log('updated student', updatedStudent);
    dispatch(updateStudent(student, updatedStudent));
  };
};

export default (selectedCampus = { students: [] }, action) => {
  switch (action.type) {
    case CREATE_CAMPUS:
      return action.campus;
    case UPDATE_STUDENT_FROM_CAMPUS: {
      if (action.student.campusId === selectedCampus.id) {
        return {
          ...selectedCampus,
          students: [...selectedCampus.students, action.updatedStudent],
        };
      } else {
        const newStudents = selectedCampus.students.filter(
          student => student.id !== action.student.id
        );
        return { ...selectedCampus, students: newStudents };
      }
    }
    case SET_SINGLE_CAMPUS:
      return action.selectedCampus;
    case UPDATE_CAMPUS:
      return action.campus;
    default:
      return selectedCampus;
  }
};
