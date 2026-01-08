import Image from 'next/image';
import { WeatherData } from '@/src/lib/weather';
import { fetchWeatherIconUrl } from '@/src/lib/weather';

interface CurrentWeatherCardProps {
  weather: WeatherData;
}

export default function CurrentWeatherCard({ weather }: CurrentWeatherCardProps) {
  return (
    <div className="mb-6 w-full sm:mb-8">
      <div className="rounded-2xl bg-linear-to-br from-indigo-600 to-blue-700 p-6 text-white shadow-2xl transition-all duration-500 hover:shadow-indigo-500/50 sm:rounded-4xl sm:p-8 md:p-10">
        <div className="mb-4 text-center sm:mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight wrap-break-word sm:text-3xl md:text-4xl">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="mt-2 text-base capitalize opacity-95 sm:text-lg md:text-xl">
            {weather.weather[0].description}
          </p>
        </div>

        <div className="mb-6 flex flex-col items-center justify-center gap-4 sm:mb-8 sm:flex-row sm:gap-6">
          <Image
            src={fetchWeatherIconUrl(weather.weather[0].icon)}
            alt={weather.weather[0].description}
            width={100}
            height={100}
            className="drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] sm:h-[120px] sm:w-[120px]"
          />
          <div className="text-6xl font-light sm:text-7xl md:text-8xl">
            {Math.round(weather.main.temp)}°
            <span className="align-top text-4xl font-normal sm:text-5xl">
              C
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-white/20 p-4 shadow-inner backdrop-blur-lg sm:gap-4 sm:p-5 md:gap-6 md:p-6">
          <div className="text-center">
            <p className="mb-1 text-xs opacity-80 sm:text-sm">
              Feels Like
            </p>
            <p className="text-lg font-bold sm:text-xl md:text-2xl">
              {Math.round(weather.main.feels_like)}°C
            </p>
          </div>
          <div className="text-center">
            <p className="mb-1 text-xs opacity-80 sm:text-sm">
              Humidity
            </p>
            <p className="text-lg font-bold sm:text-xl md:text-2xl">
              {weather.main.humidity}%
            </p>
          </div>
          <div className="text-center">
            <p className="mb-1 text-xs opacity-80 sm:text-sm">Wind</p>
            <p className="text-lg font-bold sm:text-xl md:text-2xl">
              {Math.round(weather.wind.speed)} m/s
            </p>
          </div>
          <div className="text-center">
            <p className="mb-1 text-xs opacity-80 sm:text-sm">
              Pressure
            </p>
            <p className="text-lg font-bold sm:text-xl md:text-2xl">
              {weather.main.pressure} hPa
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-around rounded-2xl bg-white/20 p-4 shadow-inner backdrop-blur-lg sm:mt-6 sm:p-5">
          <div className="text-center">
            <p className="mb-1 text-xs opacity-80 sm:text-sm">
              Min Temp
            </p>
            <p className="text-lg font-semibold sm:text-xl">
              {Math.round(weather.main.temp_min)}°C
            </p>
          </div>
          <div className="h-full w-px bg-white/30"></div>
          <div className="text-center">
            <p className="mb-1 text-xs opacity-80 sm:text-sm">
              Max Temp
            </p>
            <p className="text-lg font-semibold sm:text-xl">
              {Math.round(weather.main.temp_max)}°C
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
