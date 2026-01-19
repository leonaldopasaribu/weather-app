'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Droplets, Wind, Clock } from 'lucide-react';
import { HourlyForecast as HourlyForecastType } from '@/src/lib/weather';
import { fetchWeatherIconUrl } from '@/src/lib/weather';

interface HourlyForecastProps {
  hourlyForecast: HourlyForecastType[];
}

export default function HourlyForecast({ hourlyForecast }: HourlyForecastProps) {
  return (
    <div id="hourly" className="mb-8 group">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white/70 p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] backdrop-blur-2xl dark:bg-gray-900/80 dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/20 dark:border-gray-800">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Clock size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-gray-800 dark:text-white">
                Hourly Forecast
              </h3>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Next 24 hours</p>
            </div>
          </div>
        </div>

        {/* Scroll Container */}
        <div className="relative">
          {/* Fade Overlay for Scrolling */}
          <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-linear-to-l from-white/50 dark:from-gray-900/50 pointer-events-none sm:hidden" />
          
          <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory px-2">
            {hourlyForecast.map((hour, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group/card relative min-w-[110px] snap-start flex flex-col items-center rounded-3xl bg-white/50 p-4 border border-white/50 shadow-sm transition-all duration-300 hover:bg-white dark:bg-gray-800/40 dark:border-gray-700/50 dark:hover:bg-gray-800"
              >
                {/* Time */}
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover/card:text-indigo-500 transition-colors">
                  {hour.time}
                </span>

                {/* Weather Icon with Glow */}
                <div className="relative my-3">
                  <div className="absolute inset-0 bg-indigo-400/20 blur-xl rounded-full scale-0 group-hover/card:scale-100 transition-transform duration-500" />
                  <Image
                    src={fetchWeatherIconUrl(hour.icon)}
                    alt={hour.description}
                    width={56}
                    height={56}
                    className="relative z-10 drop-shadow-xl transition-transform duration-300 group-hover/card:scale-110"
                  />
                </div>

                {/* Temperature */}
                <div className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white mb-1">
                  {hour.temp}°
                </div>

                {/* Description */}
                <span className="text-[10px] font-bold uppercase text-gray-400 text-center line-clamp-1 mb-4">
                  {hour.description}
                </span>

                {/* Mini Stats */}
                <div className="flex w-full justify-between items-center px-1 pt-3 border-t border-gray-100 dark:border-gray-700/50">
                  <div className="flex flex-col items-center gap-0.5">
                    <Droplets size={12} className="text-blue-400" />
                    <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400">{hour.humidity}%</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <Wind size={12} className="text-teal-400" />
                    <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400">{Math.round(hour.wind_speed)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative Background Element */}
        <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}
