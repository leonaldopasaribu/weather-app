import { useState } from 'react';
import type {
  WeatherData,
  DailyForecast,
  HourlyForecast,
} from '@/src/lib/weather/types';
import {
  fetchWeatherByCity,
  fetchForecastByCity,
  fetchWeatherByCoords,
  fetchForecastByCoords,
  WeatherUtil,
} from '@/src/lib/weather';

interface UseWeatherReturn {
  city: string;
  setCity: (city: string) => void;
  weather: WeatherData | null;
  forecast: DailyForecast[];
  hourlyForecast: HourlyForecast[];
  isLoading: boolean;
  error: string;
  handleSearch: (e: React.FormEvent) => Promise<void>;
  handleGetCurrentLocation: () => void;
}

export function useWeather(): UseWeatherReturn {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCity(city),
        fetchForecastByCity(city),
      ]);
      setWeather(weatherData);
      setForecast(WeatherUtil.getForecastData(forecastData));
      setHourlyForecast(WeatherUtil.getHourlyForecast(forecastData));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'City not found. Please try again.'
      );
      setWeather(null);
      setForecast([]);
      setHourlyForecast([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const [weatherData, forecastData] = await Promise.all([
            fetchWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude
            ),
            fetchForecastByCoords(
              position.coords.latitude,
              position.coords.longitude
            ),
          ]);
          setWeather(weatherData);
          setForecast(WeatherUtil.getForecastData(forecastData));
          setHourlyForecast(WeatherUtil.getHourlyForecast(forecastData));
          setCity(weatherData.name);
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to fetch weather data'
          );
          setWeather(null);
          setForecast([]);
          setHourlyForecast([]);
        } finally {
          setIsLoading(false);
        }
      },
      () => {
        setError('Unable to retrieve your location');
        setIsLoading(false);
      }
    );
  };

  return {
    city,
    setCity,
    weather,
    forecast,
    hourlyForecast,
    isLoading,
    error,
    handleSearch,
    handleGetCurrentLocation,
  };
}
