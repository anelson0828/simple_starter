import { combineReducers } from 'redux';
import campuses from './campuses';
import students from './students';
import singleCampus from './singleCampus';
import singleStudent from './singleStudent';
import filteredCampuses from './filteredCampuses';
import filteredStudents from './filteredStudents';

const appReducer = combineReducers({
  campuses: campuses,
  students: students,
  selectedCampus: singleCampus,
  selectedStudent: singleStudent,
  filteredCampuses: filteredCampuses,
  filteredStudents: filteredStudents,
});

export default appReducer;
