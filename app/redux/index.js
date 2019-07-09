import { combineReducers } from 'redux';
import campuses from './campuses';
import students from './students';
import singleCampus from './singleCampus';
import singleStudent from './singleStudent';

const appReducer = combineReducers({
  campuses: campuses,
  students: students,
  selectedCampus: singleCampus,
  selectedStudent: singleStudent,
});

export default appReducer;
