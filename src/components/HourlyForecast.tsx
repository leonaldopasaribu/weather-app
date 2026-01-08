import Image from 'next/image';
import { HourlyForecast as HourlyForecastType } from '@/src/lib/weather';
import { fetchWeatherIconUrl } from '@/src/lib/weather';

interface HourlyForecastProps {
  hourlyForecast: HourlyForecastType[];
}

export default function HourlyForecast({
  hourlyForecast,
}: HourlyForecastProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur-md sm:rounded-4xl sm:p-6 md:p-8 dark:bg-gray-900/95 dark:shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
        <h3 className="mb-4 text-xl font-bold text-gray-800 sm:mb-6 sm:text-2xl md:text-3xl dark:text-white">
          Today&apos;s Hourly Forecast
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {hourlyForecast.map((hour, index) => (
            <div
              key={index}
              className="flex transform cursor-pointer flex-col items-center rounded-xl bg-linear-to-br from-white to-indigo-50 p-3 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-4 dark:from-gray-800 dark:to-gray-700"
            >
              <p className="mb-2 text-xs font-bold text-gray-900 sm:text-sm dark:text-white">
                {hour.time}
              </p>
              <Image
                src={fetchWeatherIconUrl(hour.icon)}
                alt={hour.description}
                width={40}
                height={40}
                className="drop-shadow-md sm:h-[50px] sm:w-[50px]"
              />
              <p className="my-2 text-2xl font-extrabold text-indigo-600 sm:text-3xl dark:text-indigo-400">
                {hour.temp}°
              </p>
              <p className="mb-2 text-center text-xs font-medium text-gray-600 capitalize sm:text-sm dark:text-gray-300">
                {hour.description}
              </p>
              <div className="flex w-full justify-around border-t border-gray-200 pt-2 text-xs dark:border-gray-700">
                <div className="text-center">
                  <p className="mb-1">💧</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {hour.humidity}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="mb-1">💨</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {hour.wind_speed}m/s
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
