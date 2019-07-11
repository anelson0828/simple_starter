import { SET_CAMPUSES, CREATE_CAMPUS, DELETE_CAMPUS } from './campuses';

const FILTER_CAMPUSES = 'FILTER_CAMPUSES';

export const filterCampuses = filteredCampuses => {
  return { type: FILTER_CAMPUSES, filteredCampuses };
};

export const filterCampusesThunk = event => {
  const filter = event.target.innerText;

  return (dispatch, getState) => {
    const { campuses } = getState();

    if (filter === 'Has Students') {
      const filteredCampuses = campuses.filter(
        campus => campus.students.length
      );
      dispatch(filterCampuses(filteredCampuses));
    } else if (filter === 'No Students') {
      const filteredCampuses = campuses.filter(
        campus => !campus.students.length
      );
      dispatch(filterCampuses(filteredCampuses));
    } else {
      dispatch(filterCampuses(campuses));
    }
  };
};

export const searchCampusesThunk = event => {
  const filter = event.target.value.toLowerCase();

  return (dispatch, getState) => {
    const { campuses } = getState();
    const filteredCampuses = campuses.filter(campus => {
      return campus.name.toLowerCase().search(filter) !== -1;
    });
    dispatch(filterCampuses(filteredCampuses));
  };
};

export default (filteredCampuses = [], action) => {
  switch (action.type) {
    case FILTER_CAMPUSES:
      return action.filteredCampuses;
    case SET_CAMPUSES:
      return action.campuses;
    case CREATE_CAMPUS:
      return [...filteredCampuses, action.campus];
    case DELETE_CAMPUS:
      return filteredCampuses.filter(campus => campus.id !== action.campusId);
    default:
      return filteredCampuses;
  }
};
