import axios from 'axios';

const SET_SINGLE_CAMPUS = 'SET_SINGLE_CAMPUS';

export const setSingleCampus = selectedCampus => {
  return { type: SET_SINGLE_CAMPUS, selectedCampus };
};

export const fetchSingleCampus = (campusId, ownProps) => {
  return async dispatch => {
    const response = await axios.get(`/api/campuses/${campusId}`);
    const selectedCampus = response.data;
    const action = setSingleCampus(selectedCampus);
    dispatch(action);
    ownProps.history.push(`/campuses/${selectedCampus.id}`);
  };
};

export default (selectedCampus = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_CAMPUS:
      return action.selectedCampus;
    default:
      return selectedCampus;
  }
};
