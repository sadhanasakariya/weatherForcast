// weatherActions.test.ts
import { SET_WEATHER_DATA, SET_LOADING, SET_ERROR, setLoading, setError, setWeatherData } from '../actions/weatherActions';

jest.mock('axios');
describe('Weather actions', () => {


  it('should create an action to set loading state', () => {
    const loading = true;
    const expectedAction = {
      type: SET_LOADING,
      payload: loading,
    };
    expect(setLoading(loading)).toEqual(expectedAction);
  });

  it('should create an action to set weather data', () => {
    const data = { /* your mock weather data */ };
    const expectedAction = {
      type: SET_WEATHER_DATA,
      payload: data,
    };
    expect(setWeatherData(data)).toEqual(expectedAction);
  });

  it('should create an action to set error message', () => {
    const error = 'An error occurred';
    const expectedAction = {
      type: SET_ERROR,
      payload: error,
    };
    expect(setError(error)).toEqual(expectedAction);
  });

});


