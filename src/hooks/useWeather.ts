import { useState } from 'react';
import type {
  WeatherData,
  DailyForecast,
  HourlyForecast,
  AirQualityInfo,
} from '@/src/lib/weather/types';
import {
  fetchWeatherByCity,
  fetchForecastByCity,
  fetchWeatherByCoords,
  fetchForecastByCoords,
  fetchAirPollutionByCoords,
  WeatherUtil,
} from '@/src/lib/weather';

interface UseWeatherReturn {
  city: string;
  setCity: (city: string) => void;
  weather: WeatherData | null;
  forecast: DailyForecast[];
  hourlyForecast: HourlyForecast[];
  airQuality: AirQualityInfo | null;
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
  const [airQuality, setAirQuality] = useState<AirQualityInfo | null>(null);
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

      // Fetch air quality data using coordinates from weather data
      try {
        const airPollutionData = await fetchAirPollutionByCoords(
          weatherData.coord.lat,
          weatherData.coord.lon
        );
        const airQualityInfo = WeatherUtil.getAirQualityInfo(airPollutionData);
        setAirQuality(airQualityInfo);
      } catch {
        // If air quality fetch fails, just set it to null
        setAirQuality(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'City not found. Please try again.'
      );
      setWeather(null);
      setForecast([]);
      setHourlyForecast([]);
      setAirQuality(null);
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

          // Fetch air quality data using coordinates
          try {
            const airPollutionData = await fetchAirPollutionByCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            const airQualityInfo = WeatherUtil.getAirQualityInfo(airPollutionData);
            setAirQuality(airQualityInfo);
          } catch {
            // If air quality fetch fails, just set it to null
            setAirQuality(null);
          }
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to fetch weather data'
          );
          setWeather(null);
          setForecast([]);
          setHourlyForecast([]);
          setAirQuality(null);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable. Please try again.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.';
            break;
        }
        
        setError(errorMessage);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return {
    city,
    setCity,
    weather,
    forecast,
    hourlyForecast,
    airQuality,
    isLoading,
    error,
    handleSearch,
    handleGetCurrentLocation,
  };
}
