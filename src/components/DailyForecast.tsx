import Image from 'next/image';
import { DailyForecast as DailyForecastType } from '@/src/lib/weather';
import { fetchWeatherIconUrl } from '@/src/lib/weather';

interface DailyForecastProps {
  forecast: DailyForecastType[];
}

export default function DailyForecast({ forecast }: DailyForecastProps) {
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur-md sm:rounded-4xl sm:p-6 md:p-8 dark:bg-gray-900/95 dark:shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
        <h3 className="mb-4 text-xl font-bold text-gray-800 sm:mb-6 sm:text-2xl md:text-3xl dark:text-white">
          Extended 7-Day Forecast
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4 xl:grid-cols-7">
          {forecast.slice(0, 7).map((day, index) => (
            <div
              key={index}
              className="flex transform cursor-pointer flex-col rounded-xl bg-linear-to-br from-white to-blue-50 p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-5 dark:from-gray-800 dark:to-gray-700"
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-base font-extrabold text-gray-900 sm:text-lg dark:text-white">
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
                  className="drop-shadow-md sm:h-[50px] sm:w-[50px]"
                />
              </div>

              <div className="mb-3 flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
                <div className="text-center">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Low
                  </p>
                  <p className="text-xl font-bold text-blue-500 sm:text-2xl dark:text-blue-400">
                    {day.temp_min}°
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    High
                  </p>
                  <p className="text-xl font-bold text-red-500 sm:text-2xl dark:text-red-400">
                    {day.temp_max}°
                  </p>
                </div>
              </div>

              <p className="mb-3 text-center text-xs font-medium text-gray-700 capitalize sm:text-sm dark:text-gray-300">
                {day.description}
              </p>

              <div className="flex justify-around pt-2 text-xs text-gray-600 sm:text-sm dark:text-gray-400">
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
  );
}
