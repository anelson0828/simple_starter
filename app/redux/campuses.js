import axios from 'axios';

const SET_CAMPUSES = 'SET_CAMPUSES';
const CREATE_CAMPUS = 'CREATE_CAMPUS';

export const setCampuses = campuses => {
  return { type: SET_CAMPUSES, campuses };
};

export const createCampus = campus => {
  return { type: CREATE_CAMPUS, campus };
};

export const fetchCampuses = () => {
  return async dispatch => {
    const response = await axios.get('/api/campuses');
    const campuses = response.data;
    const action = setCampuses(campuses);
    dispatch(action);
  };
};

export const createCampusThunk = campus => {
  return async dispatch => {
    const response = await axios.post('/api/campuses', campus);
    const newCampus = response.data;
    const action = createCampus(newCampus);
    dispatch(action);
  };
};

export default (campuses = [], action) => {
  switch (action.type) {
    case SET_CAMPUSES:
      return action.campuses;
    case CREATE_CAMPUS:
      return [...campuses, action.campus];
    default:
      return campuses;
  }
};
