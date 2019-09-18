import { combineReducers } from 'redux';
import students from './students';
import singleStudent from './singleStudent';

const appReducer = combineReducers({
  students: students,
  selectedStudent: singleStudent,
});

export default appReducer;
