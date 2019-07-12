import { combineReducers } from 'redux';
import campuses from './campuses';
import students from './students';
import singleCampus from './singleCampus';
import singleStudent from './singleStudent';
import filteredCampuses from './filteredCampuses';
import filteredStudents from './filteredStudents';
import pagination from './pagination';

const appReducer = combineReducers({
  campuses: campuses,
  students: students,
  selectedCampus: singleCampus,
  selectedStudent: singleStudent,
  filteredCampuses: filteredCampuses,
  filteredStudents: filteredStudents,
  paginatedCampuses: pagination,
});

export default appReducer;
