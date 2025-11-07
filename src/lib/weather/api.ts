import axios, { HttpStatusCode, type AxiosError } from 'axios';
import type { WeatherData, ForecastData } from './types';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_OPENWEATHER_API_URL;

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
  },
  timeout: 10_000,
});

weatherApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      const errorMessages: Record<number, string> = {
        [HttpStatusCode.NotFound]: 'Location not found',
        [HttpStatusCode.Unauthorized]: 'Invalid API key',
        [HttpStatusCode.TooManyRequests]:
          'Too many requests. Please try again later',
      };

      const message =
        errorMessages[status] ?? `API error: ${error.response.statusText}`;
      throw new Error(message);
    }

    if (error.request) {
      throw new Error('No response from weather service');
    }

    throw new Error('Failed to fetch weather data');
  }
);

export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  const { data } = await weatherApi.get<WeatherData>('/data/2.5/weather', {
    params: { q: city },
  });

  return data;
}

export async function fetchWeatherByCoords(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const { data } = await weatherApi.get<WeatherData>('/data/2.5/weather', {
    params: { lat, lon },
  });

  return data;
}

export async function fetchForecastByCity(city: string): Promise<ForecastData> {
  const { data } = await weatherApi.get<ForecastData>('/data/2.5/forecast', {
    params: { q: city },
  });

  return data;
}

export async function fetchForecastByCoords(
  lat: number,
  lon: number
): Promise<ForecastData> {
  const { data } = await weatherApi.get<ForecastData>('/data/2.5/forecast', {
    params: { lat, lon },
  });

  return data;
}

export function fetchWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
