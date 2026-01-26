'use client';

import dynamic from 'next/dynamic';
import { WeatherBackgroundUtil } from '@/src/utils';
import {
  ThemeToggleButton,
  WelcomeHeader,
  SearchForm,
  ErrorMessage,
  LoadingSkeleton,
  HourlyForecast,
  CurrentWeatherCard,
  DailyForecast,
  AirQuality,
  NavigationHeader,
} from '@/src/components';
import { useWeather, useTheme } from '@/src/hooks';

// Dynamically import WeatherMap to avoid SSR issues with Leaflet
const WeatherMap = dynamic(
  () =>
    import('@/src/components/WeatherMap').then((mod) => ({
      default: mod.WeatherMap,
    })),
  { ssr: false }
);

export default function Home() {
  const {
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
    handleLocationSelect,
  } = useWeather();

  const { isDark, toggleTheme } = useTheme();

  const weatherCondition = weather?.weather[0]?.main;
  const backgroundStyle = WeatherBackgroundUtil.getBackgroundStyle(
    weatherCondition,
    isDark
  );

  return (
    <div
      className="min-h-screen p-2 font-sans transition-all duration-500 sm:p-4 md:p-6"
      style={backgroundStyle}
    >
      <ThemeToggleButton isDark={isDark} onToggle={toggleTheme} />

      <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center py-6 sm:py-12">
        {!weather && !isLoading && <WelcomeHeader />}

        <div className="w-full max-w-7xl px-2 sm:px-4">
          <div className="relative z-50 mb-6 rounded-2xl bg-white/95 p-4 shadow-[0_20px_50px_rgba(8,112,184,0.7)] backdrop-blur-md sm:mb-8 sm:rounded-4xl sm:p-6 md:p-8 lg:p-10 dark:bg-gray-900/95 dark:shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
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
              onLocationSelect={handleLocationSelect}
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

          <NavigationHeader
            isVisible={Boolean(
              weather &&
                (hourlyForecast.length > 0 || forecast.length > 0 || airQuality)
            )}
          />

          {isLoading && <LoadingSkeleton />}

          {weather && <CurrentWeatherCard weather={weather} />}

          {weather && hourlyForecast.length > 0 && (
            <HourlyForecast hourlyForecast={hourlyForecast} />
          )}

          {weather && forecast.length > 0 && (
            <DailyForecast forecast={forecast} />
          )}

          {weather && airQuality && <AirQuality airQuality={airQuality} />}

          {weather && (
            <WeatherMap
              lat={weather.coord.lat}
              lon={weather.coord.lon}
              cityName={weather.name}
              temperature={weather.main.temp}
              description={weather.weather[0].description}
            />
          )}
        </div>
      </main>
    </div>
  );
}
