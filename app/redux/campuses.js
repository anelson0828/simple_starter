import axios from 'axios';

const SET_CAMPUSES = 'SET_CAMPUSES';

export const setCampuses = campuses => {
  return { type: SET_CAMPUSES, campuses };
};

export const fetchCampuses = () => {
  return async dispatch => {
    const response = await axios.get('/api/campuses');
    const campuses = response.data;
    const action = setCampuses(campuses);
    dispatch(action);
  };
};

export default (campuses = [], action) => {
  switch (action.type) {
    case SET_CAMPUSES:
      return action.campuses;
    default:
      return campuses;
  }
};
