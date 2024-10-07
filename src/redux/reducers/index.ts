import { combineReducers } from 'redux';

import weatherReducer from './weatherReducer'; // Import the weather reducer

const rootReducer = combineReducers({
  weather: weatherReducer, // Add weather reducer
});

export default rootReducer;