import { SET_ERROR, SET_LOADING, SET_WEATHER_DATA } from "./weatherActions";

export interface SetWeatherDataAction {
    type: typeof SET_WEATHER_DATA;
    payload: any; // Define a more specific type if possible
  }
  
  export interface SetLoadingAction {
    type: typeof SET_LOADING;
    payload: boolean;
  }
  
  export interface SetErrorAction {
    type: typeof SET_ERROR;
    payload: string | null;
  }
  
  // Combine all action types into a single type
  export type WeatherActionTypes =
    | SetWeatherDataAction
    | SetLoadingAction
    | SetErrorAction;