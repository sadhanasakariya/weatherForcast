import { WeatherState } from '../types'; // Import the WeatherState interface

const initialState: WeatherState = {
  forecast:null,
  loading: false,
  error: null,
};

const weatherReducer = (state = initialState, action: any): WeatherState => {
  switch (action.type) {
    case 'SET_WEATHER_DATA':
      return {
        ...state,
        forecast: action.payload,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};


export default weatherReducer;