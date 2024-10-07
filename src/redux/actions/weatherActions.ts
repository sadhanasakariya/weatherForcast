import axios from "axios";
import { AppThunk } from "../store";


export const SET_WEATHER_DATA = 'SET_WEATHER_DATA';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';


export const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';

export const setWeatherData = (data: unknown) => ({
  type: SET_WEATHER_DATA,
  payload: data,
});

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error: string | null) => ({
  type: SET_ERROR,
  payload: error,
});

// Async function to fetch weather data
export const fetchWeatherForecast = (city: string): AppThunk => {
  return async (dispatch) => {


    dispatch(setLoading(true));
    try {

      const responseForecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      const dataForecast = responseForecast.data;

      let dailyData = dataForecast
      dailyData.list = dataForecast.list.filter((_: unknown, index: number) => index % 8 === 0);

      dispatch(setWeatherData(dailyData));
    } catch (error) {
      console.log("error", error)
      dispatch(setError('Failed to fetch weather data'));
    } finally {
      dispatch(setLoading(false));
    }
  };
};