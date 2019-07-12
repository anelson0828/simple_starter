import axios from 'axios';
import { CREATE_CAMPUS } from './campuses';

const SET_SINGLE_CAMPUS = 'SET_SINGLE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const UNREGISTER_STUDENT = 'UNREGISTER_STUDENT';

export const setSingleCampus = selectedCampus => {
  return { type: SET_SINGLE_CAMPUS, selectedCampus };
};

export const updateCampus = campus => {
  return { type: UPDATE_CAMPUS, campus };
};

export const unregisterStudent = student => {
  return { type: UNREGISTER_STUDENT, student };
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

export const unregisterStudentThunk = student => {
  return async dispatch => {
    await axios.put(`/api/students/${student.id}`, student);
    dispatch(unregisterStudent(student));
  };
};

export default (selectedCampus = { students: [] }, action) => {
  switch (action.type) {
    case CREATE_CAMPUS:
      return action.campus;
    case SET_SINGLE_CAMPUS:
      return action.selectedCampus;
    case UPDATE_CAMPUS:
      return action.campus;
    case UNREGISTER_STUDENT: {
      const newStudents = selectedCampus.students.filter(
        student => student.id !== action.student.id
      );
      return { ...selectedCampus, students: newStudents };
    }
    default:
      return selectedCampus;
  }
};
