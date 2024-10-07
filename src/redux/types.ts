export interface ForecastResponse {
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
  list: Array<{
    dt: number; // Timestamp
    main: {
      temp: number; // Temperature
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number; // Wind speed
      deg: number; // Wind direction
    };
    dt_txt: string; // Date and time of the forecast
  }>;
}
export interface WeatherState {
  forecast: ForecastResponse | null; // You can replace `any` with a more specific type if you have one
  loading: boolean;
  error: string | null;
}