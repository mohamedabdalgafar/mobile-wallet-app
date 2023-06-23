import UserDataReducer from './UserDataReducer';
import LocationsReducer from './LocationsReducer';

import {combineReducers} from 'redux';

export default combineReducers({
  UserDataReducer,
  LocationsReducer,
});
