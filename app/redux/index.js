import { combineReducers } from 'redux';
import campuses from './campuses';
import students from './students';

const appReducer = combineReducers({
  campuses: campuses,
  students: students,
});

export default appReducer;
