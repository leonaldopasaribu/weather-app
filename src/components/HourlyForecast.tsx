'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Droplets, Wind, Clock } from 'lucide-react';
import { HourlyForecast as HourlyForecastType } from '@/src/lib/weather';
import { fetchWeatherIconUrl } from '@/src/lib/weather';

interface HourlyForecastProps {
  hourlyForecast: HourlyForecastType[];
}

export default function HourlyForecast({
  hourlyForecast,
}: HourlyForecastProps) {
  return (
    <div id="hourly" className="group mb-8">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/70 p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-indigo-500/10 p-2.5 text-indigo-600 dark:text-indigo-400">
              <Clock size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-gray-800 dark:text-white">
                Hourly Forecast
              </h3>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Next 24 hours
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Container */}
        <div className="relative">
          {/* Fade Overlay for Scrolling */}
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-12 bg-linear-to-l from-white/50 sm:hidden dark:from-gray-900/50" />

          <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-6">
            {hourlyForecast.map((hour, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group/card relative flex min-w-[110px] snap-start flex-col items-center rounded-3xl border border-white/50 bg-white/50 p-4 shadow-sm transition-all duration-300 hover:bg-white dark:border-gray-700/50 dark:bg-gray-800/40 dark:hover:bg-gray-800"
              >
                {/* Time */}
                <span className="text-xs font-bold tracking-wider text-gray-400 uppercase transition-colors group-hover/card:text-indigo-500">
                  {hour.time}
                </span>

                {/* Weather Icon with Glow */}
                <div className="relative my-3">
                  <div className="absolute inset-0 scale-0 rounded-full bg-indigo-400/20 blur-xl transition-transform duration-500 group-hover/card:scale-100" />
                  <Image
                    src={fetchWeatherIconUrl(hour.icon)}
                    alt={hour.description}
                    width={56}
                    height={56}
                    className="relative z-10 drop-shadow-xl transition-transform duration-300 group-hover/card:scale-110"
                  />
                </div>

                {/* Temperature */}
                <div className="mb-1 text-2xl font-black tracking-tighter text-gray-900 dark:text-white">
                  {hour.temp}°
                </div>

                {/* Description */}
                <span className="mb-4 line-clamp-1 text-center text-[10px] font-bold text-gray-400 uppercase">
                  {hour.description}
                </span>

                {/* Mini Stats */}
                <div className="flex w-full items-center justify-between border-t border-gray-100 px-1 pt-3 dark:border-gray-700/50">
                  <div className="flex flex-col items-center gap-0.5">
                    <Droplets size={12} className="text-blue-400" />
                    <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400">
                      {hour.humidity}%
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <Wind size={12} className="text-teal-400" />
                    <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400">
                      {Math.round(hour.wind_speed)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative Background Element */}
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-indigo-500/5 blur-3xl" />
      </div>
    </div>
  );
}
