import { FETCH_SEARCH_RESULTSSUCCESS } from '../actions/actionTypes';

const initialSearchstate = {
  results: [],
};
export default function search(state = initialSearchstate, action) {
  switch (action.type) {
    case FETCH_SEARCH_RESULTSSUCCESS:
      return {
        ...state,
        results: action.users,
      };
    default:
      return state;
  }
}
