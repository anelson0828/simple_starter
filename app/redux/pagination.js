import { CREATE_CAMPUS, DELETE_CAMPUS } from './campuses';
import { FILTER_CAMPUSES } from './filteredCampuses';

import axios from 'axios';

const PAGINATION = 'PAGINATION';

export const paginationAction = campusesData => {
  return { type: PAGINATION, campusesData };
};

export const fetchCampusesPaginationThunk = page => {
  return async dispatch => {
    const response = await axios.get(`/api/campuses/page/${page}`);
    const campusesData = response.data;
    dispatch(paginationAction(campusesData));
  };
};

export const fetchCampusesFilterThunk = (page, filter) => {
  return async dispatch => {
    const response = await axios.get(
      `/api/campuses/page/${page}/?filter=${filter}`
    );
    const campusesData = response.data;
    dispatch(paginationAction(campusesData));
  };
};

export default (paginatatedCampuses = {}, action) => {
  switch (action.type) {
    case PAGINATION:
      return action.campusesData;
    case FILTER_CAMPUSES:
      return action.filteredCampuses;
    case CREATE_CAMPUS:
      return {
        ...paginatatedCampuses,
        result: [...paginatatedCampuses.result, action.campus],
      };
    case DELETE_CAMPUS: {
      const newCampuses = paginatatedCampuses.result.filter(
        campus => campus.id !== action.campusId
      );
      return {
        ...paginatatedCampuses,
        result: newCampuses,
      };
    }
    default:
      return paginatatedCampuses;
  }
};
