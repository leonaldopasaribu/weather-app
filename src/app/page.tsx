"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Cloud, Sun, Loader2, LocateFixed, Search } from "lucide-react";
import {
  WeatherData,
  DailyForecast,
  fetchWeatherByCity,
  fetchForecastByCity,
  fetchWeatherByCoords,
  fetchForecastByCoords,
  fetchWeatherIconUrl,
  WeatherUtil,
} from "@/src/lib/weather";
import { ThemeUtil } from "@/src/utils/theme";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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
    setError("");

    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCity(city),
        fetchForecastByCity(city),
      ]);
      setWeather(weatherData);
      setForecast(WeatherUtil.getForecastData(forecastData));
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
      setForecast([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    setError("");

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
          setCity(weatherData.name);
        } catch (err) {
          setError("Unable to fetch weather data");
          setWeather(null);
          setForecast([]);
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setError("Unable to retrieve your location");
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-500/90 via-blue-500 to-cyan-500/90 p-2 sm:p-4 md:p-6 font-sans transition-all duration-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950">
      <button
        onClick={handleToggleTheme}
        className="fixed right-3 top-3 sm:right-6 sm:top-6 z-50 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/80 shadow-xl transition-all duration-300 hover:scale-[1.08] dark:bg-gray-800/80"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
        ) : (
          <Cloud className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
        )}
      </button>

      <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center py-6 sm:py-12">
        {!weather && !isLoading && (
          <div className="mb-6 sm:mb-10 text-center px-4">
            <div className="mb-4 sm:mb-6 animate-pulse text-5xl sm:text-6xl md:text-8xl">
              ☀️
            </div>
            <h1 className="mb-3 sm:mb-4 bg-linear-to-r from-white via-blue-200 to-white bg-clip-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent drop-shadow-lg dark:from-indigo-300 dark:via-blue-300 dark:to-white">
              The Weather Channel
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/95 dark:text-gray-300">
              Precise forecasts at your fingertips
            </p>
          </div>
        )}

        <div className="w-full max-w-7xl px-2 sm:px-4">
          <div className="mb-6 sm:mb-8 rounded-2xl sm:rounded-4xl bg-white/95 p-4 sm:p-6 md:p-8 lg:p-10 shadow-[0_20px_50px_rgba(8,112,184,0.7)] backdrop-blur-md dark:bg-gray-900/95 dark:shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            {weather && (
              <div className="mb-6 sm:mb-8 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white">
                  Weather Dashboard
                </h1>
                <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Real-time weather and a 7-day outlook
                </p>
              </div>
            )}

            <form onSubmit={handleSearch} className="mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Search for a city..."
                  className="flex-1 rounded-xl border border-gray-300 px-4 sm:px-5 py-2.5 sm:py-3 text-base sm:text-lg text-gray-800 shadow-inner focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-2.5 sm:py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                  {isLoading ? "Fetching..." : "Search"}
                </button>
              </div>
            </form>

            <button
              onClick={handleGetCurrentLocation}
              disabled={isLoading}
              className="mb-4 sm:mb-6 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-indigo-500 px-4 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg font-semibold text-indigo-600 transition-all duration-300 hover:scale-[1.01] hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-indigo-400 dark:hover:bg-gray-800/50 dark:hover:border-indigo-400"
            >
              <LocateFixed className="h-5 w-5" />
              <span className="text-sm sm:text-base">Use Current Location</span>
            </button>

            {error && (
              <div className="rounded-xl bg-red-500/10 p-3 sm:p-4 text-sm sm:text-base text-red-700 dark:bg-red-900/30 dark:text-red-400">
                {error}
              </div>
            )}

            {!weather && !error && !isLoading && (
              <div className="py-8 sm:py-12 text-center text-gray-500 dark:text-gray-400">
                <div className="mb-3 sm:mb-4 text-5xl sm:text-6xl md:text-7xl">
                  📍
                </div>
                <p className="text-base sm:text-lg md:text-xl font-medium px-4">
                  Start by searching a city or using your location.
                </p>
              </div>
            )}
          </div>

          {isLoading && (
            <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row animate-pulse">
              <div className="w-full lg:w-2/5">
                <div className="rounded-2xl sm:rounded-4xl bg-linear-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 p-6 sm:p-8 md:p-10 shadow-2xl">
                  <div className="mb-4 sm:mb-6 text-center">
                    <div className="h-8 sm:h-10 bg-white/30 dark:bg-gray-600/30 rounded-lg mx-auto w-3/4 mb-3"></div>
                    <div className="h-5 sm:h-6 bg-white/20 dark:bg-gray-600/20 rounded-lg mx-auto w-1/2"></div>
                  </div>

                  <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                    <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-white/30 dark:bg-gray-600/30 rounded-full"></div>
                    <div className="h-24 sm:h-28 bg-white/30 dark:bg-gray-600/30 rounded-lg w-40"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 rounded-2xl bg-white/20 dark:bg-gray-600/20 p-4 sm:p-5 md:p-6 backdrop-blur-lg">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="text-center">
                        <div className="h-4 bg-white/30 dark:bg-gray-500/30 rounded mb-2 mx-auto w-20"></div>
                        <div className="h-6 bg-white/40 dark:bg-gray-500/40 rounded mx-auto w-16"></div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 sm:mt-6 flex justify-around rounded-2xl bg-white/20 dark:bg-gray-600/20 p-4 sm:p-5 backdrop-blur-lg">
                    <div className="text-center">
                      <div className="h-4 bg-white/30 dark:bg-gray-500/30 rounded mb-2 mx-auto w-16"></div>
                      <div className="h-6 bg-white/40 dark:bg-gray-500/40 rounded mx-auto w-12"></div>
                    </div>
                    <div className="h-full w-px bg-white/30"></div>
                    <div className="text-center">
                      <div className="h-4 bg-white/30 dark:bg-gray-500/30 rounded mb-2 mx-auto w-16"></div>
                      <div className="h-6 bg-white/40 dark:bg-gray-500/40 rounded mx-auto w-12"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-3/5">
                <div className="rounded-2xl sm:rounded-4xl bg-white/95 dark:bg-gray-900/95 p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-md">
                  <div className="h-8 sm:h-10 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4 sm:mb-6 w-3/4"></div>
                  <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <div
                        key={i}
                        className="flex flex-col rounded-xl bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 p-4 sm:p-5 shadow-lg"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex-1">
                            <div className="h-5 sm:h-6 bg-gray-400 dark:bg-gray-600 rounded mb-2 w-20"></div>
                            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                          </div>
                          <div className="w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                        </div>

                        <div className="mb-3 flex items-center justify-between border-b border-gray-400 dark:border-gray-600 pb-3">
                          <div className="text-center">
                            <div className="h-3 bg-gray-400 dark:bg-gray-600 rounded mb-2 w-8 mx-auto"></div>
                            <div className="h-7 bg-gray-400 dark:bg-gray-600 rounded w-12 mx-auto"></div>
                          </div>
                          <div className="text-center">
                            <div className="h-3 bg-gray-400 dark:bg-gray-600 rounded mb-2 w-8 mx-auto"></div>
                            <div className="h-7 bg-gray-400 dark:bg-gray-600 rounded w-12 mx-auto"></div>
                          </div>
                        </div>

                        <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded mb-3 mx-auto w-32"></div>

                        <div className="flex justify-around pt-2">
                          <div className="text-center">
                            <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded mb-1 w-6 mx-auto"></div>
                            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-10 mx-auto"></div>
                          </div>
                          <div className="text-center">
                            <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded mb-1 w-6 mx-auto"></div>
                            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-10 mx-auto"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {weather && (
            <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row">
              <div className="w-full lg:w-2/5">
                <div className="rounded-2xl sm:rounded-4xl bg-linear-to-br from-indigo-600 to-blue-700 p-6 sm:p-8 md:p-10 text-white shadow-2xl transition-all duration-500 hover:shadow-indigo-500/50">
                  <div className="mb-4 sm:mb-6 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight wrap-break-word">
                      {weather.name}, {weather.sys.country}
                    </h2>
                    <p className="mt-2 text-base sm:text-lg md:text-xl capitalize opacity-95">
                      {weather.weather[0].description}
                    </p>
                  </div>

                  <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                    <Image
                      src={fetchWeatherIconUrl(weather.weather[0].icon)}
                      alt={weather.weather[0].description}
                      width={100}
                      height={100}
                      className="drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] sm:w-[120px] sm:h-[120px]"
                    />
                    <div className="text-6xl sm:text-7xl md:text-8xl font-light">
                      {Math.round(weather.main.temp)}°
                      <span className="text-4xl sm:text-5xl font-normal align-top">
                        C
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 rounded-2xl bg-white/20 p-4 sm:p-5 md:p-6 backdrop-blur-lg shadow-inner">
                    <div className="text-center">
                      <p className="mb-1 text-xs sm:text-sm opacity-80">
                        Feels Like
                      </p>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold">
                        {Math.round(weather.main.feels_like)}°C
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="mb-1 text-xs sm:text-sm opacity-80">
                        Humidity
                      </p>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold">
                        {weather.main.humidity}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="mb-1 text-xs sm:text-sm opacity-80">Wind</p>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold">
                        {Math.round(weather.wind.speed)} m/s
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="mb-1 text-xs sm:text-sm opacity-80">
                        Pressure
                      </p>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold">
                        {weather.main.pressure} hPa
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6 flex justify-around rounded-2xl bg-white/20 p-4 sm:p-5 backdrop-blur-lg shadow-inner">
                    <div className="text-center">
                      <p className="mb-1 text-xs sm:text-sm opacity-80">
                        Min Temp
                      </p>
                      <p className="text-lg sm:text-xl font-semibold">
                        {Math.round(weather.main.temp_min)}°C
                      </p>
                    </div>
                    <div className="h-full w-px bg-white/30"></div>
                    <div className="text-center">
                      <p className="mb-1 text-xs sm:text-sm opacity-80">
                        Max Temp
                      </p>
                      <p className="text-lg sm:text-xl font-semibold">
                        {Math.round(weather.main.temp_max)}°C
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {forecast.length > 0 && (
                <div className="w-full lg:w-3/5">
                  <div className="rounded-2xl sm:rounded-4xl bg-white/95 p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-md dark:bg-gray-900/95 dark:shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                    <h3 className="mb-4 sm:mb-6 text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                      Extended 7-Day Forecast
                    </h3>
                    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                      {forecast.slice(0, 7).map((day, index) => (
                        <div
                          key={index}
                          className="flex transform cursor-pointer flex-col rounded-xl bg-linear-to-br from-white to-blue-50 p-4 sm:p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:from-gray-800 dark:to-gray-700"
                        >
                          <div className="mb-3 flex items-center justify-between">
                            <div>
                              <p className="text-base sm:text-lg font-extrabold text-gray-900 dark:text-white">
                                {day.day}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {day.date}
                              </p>
                            </div>
                            <Image
                              src={fetchWeatherIconUrl(day.icon)}
                              alt={day.description}
                              width={45}
                              height={45}
                              className="drop-shadow-md sm:w-[50px] sm:h-[50px]"
                            />
                          </div>

                          <div className="mb-3 flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
                            <div className="text-center">
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Low
                              </p>
                              <p className="text-xl sm:text-2xl font-bold text-blue-500 dark:text-blue-400">
                                {day.temp_min}°
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                High
                              </p>
                              <p className="text-xl sm:text-2xl font-bold text-red-500 dark:text-red-400">
                                {day.temp_max}°
                              </p>
                            </div>
                          </div>

                          <p className="mb-3 text-center text-xs sm:text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
                            {day.description}
                          </p>

                          <div className="flex justify-around pt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            <div className="text-center">
                              <p className="font-semibold">💧</p>
                              <p>{day.humidity}%</p>
                            </div>
                            <div className="text-center">
                              <p className="font-semibold">💨</p>
                              <p>{day.wind_speed} m/s</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
