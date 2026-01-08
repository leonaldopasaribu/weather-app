'use client';

import { useState, useEffect } from 'react';
import {
  WeatherData,
  DailyForecast,
  HourlyForecast,
  fetchWeatherByCity,
  fetchForecastByCity,
  fetchWeatherByCoords,
  fetchForecastByCoords,
  WeatherUtil,
} from '@/src/lib/weather';
import { ThemeUtil } from '@/src/utils/theme';
import {
  ThemeToggleButton,
  WelcomeHeader,
  SearchForm,
  ErrorMessage,
  LoadingSkeleton,
  HourlyForecast as HourlyForecastComponent,
  CurrentWeatherCard,
  DailyForecast as DailyForecastComponent,
} from '@/src/components';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const initialTheme = ThemeUtil.initializeTheme();
    setIsDark(initialTheme);
  }, []);

  const handleToggleTheme = () => {
    const newTheme = ThemeUtil.toggleTheme(isDark);
    setIsDark(newTheme);
  };

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
      setError('City not found. Please try again.');
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
          setError('Unable to fetch weather data');
          setWeather(null);
          setForecast([]);
          setHourlyForecast([]);
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setError('Unable to retrieve your location');
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-500/90 via-blue-500 to-cyan-500/90 p-2 font-sans transition-all duration-500 sm:p-4 md:p-6 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950">
      <ThemeToggleButton isDark={isDark} onToggle={handleToggleTheme} />

      <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center py-6 sm:py-12">
        {!weather && !isLoading && <WelcomeHeader />}

        <div className="w-full max-w-7xl px-2 sm:px-4">
          <div className="mb-6 rounded-2xl bg-white/95 p-4 shadow-[0_20px_50px_rgba(8,112,184,0.7)] backdrop-blur-md sm:mb-8 sm:rounded-4xl sm:p-6 md:p-8 lg:p-10 dark:bg-gray-900/95 dark:shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            {weather && (
              <div className="mb-6 text-center sm:mb-8">
                <h1 className="text-2xl font-extrabold text-gray-800 sm:text-3xl md:text-4xl dark:text-white">
                  Weather Dashboard
                </h1>
                <p className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-300">
                  Real-time weather and a 7-day outlook
                </p>
              </div>
            )}

            <SearchForm
              city={city}
              isLoading={isLoading}
              onCityChange={setCity}
              onSubmit={handleSearch}
              onGetCurrentLocation={handleGetCurrentLocation}
            />

            {error && <ErrorMessage message={error} />}

            {!weather && !error && !isLoading && (
              <div className="py-8 text-center text-gray-500 sm:py-12 dark:text-gray-400">
                <div className="mb-3 text-5xl sm:mb-4 sm:text-6xl md:text-7xl">
                  📍
                </div>
                <p className="px-4 text-base font-medium sm:text-lg md:text-xl">
                  Start by searching a city or using your location.
                </p>
              </div>
            )}
          </div>

          {isLoading && <LoadingSkeleton />}

          {weather && <CurrentWeatherCard weather={weather} />}

          {weather && hourlyForecast.length > 0 && (
            <HourlyForecastComponent hourlyForecast={hourlyForecast} />
          )}

          {weather && forecast.length > 0 && (
            <DailyForecastComponent forecast={forecast} />
          )}
        </div>
      </main>
    </div>
  );
}
