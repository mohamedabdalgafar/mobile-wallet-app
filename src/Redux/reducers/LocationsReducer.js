import {
  UPDATE_USER_LOCATION,
  ADD_NEW_LOCATION,
  GET_ALL_PLACES,
  DELETE_ADDRESS,
  CHANGE_TO_PRIME_LOC,
  LOAD_PLACE_DELETE,
  MODIFY_LOCATION,
} from '../actionTypes';

const initialState = {
  currentLocation: {
    name: '',
    latitude: 0,
    longitude: 0,
    shortName: '',
  },
  storedLoactions: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
      };
    case ADD_NEW_LOCATION:
      return {
        ...state,
        storedLoactions: [...action.payload],
      };

    case GET_ALL_PLACES:
      return {
        ...state,
        storedLoactions: [...action.payload],
      };
    case DELETE_ADDRESS:
      return {
        ...state,
        storedLoactions: [...action.payload],
      };
    case CHANGE_TO_PRIME_LOC:
      return {
        ...state,
        storedLoactions: [...action.payload],
      };
    case LOAD_PLACE_DELETE:
      return {
        ...state,
        storedLoactions: [...action.payload],
      };
    case MODIFY_LOCATION:
      return {
        ...state,
        storedLoactions: [...action.payload],
      };
    default:
      return state;
  }
};
