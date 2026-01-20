'use client';

import { motion } from 'framer-motion';
import { Wind, Info, AlertCircle } from 'lucide-react';
import type { AirQualityInfo } from '@/src/lib/weather/types';

interface AirQualityProps {
  airQuality: AirQualityInfo;
}

export default function AirQuality({ airQuality }: AirQualityProps) {
  const { aqi, label, description, color } = airQuality;

  // Kalkulasi persentase untuk progress bar (skala 1-5)
  const progressWidth = (aqi / 5) * 100;

  return (
    <motion.div
      id="air-quality"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-[2rem] bg-white/80 p-1 shadow-2xl backdrop-blur-xl dark:bg-gray-900/80"
    >
      {/* Glow Effect Background */}
      <div
        className={`absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-20 blur-3xl transition-colors duration-500 ${color.split(' ')[0]}`}
      />

      <div className="relative z-10 p-6 sm:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-600 dark:text-indigo-400">
              <Wind size={24} />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-gray-800 dark:text-white">
              Air Quality Index
            </h3>
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-gray-800">
            Live Updates
          </span>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_auto]">
          <div className="space-y-6">
            <div>
              <div className="mb-1 flex items-baseline gap-2">
                <span className="text-6xl font-black tracking-tighter text-gray-900 dark:text-white">
                  {aqi}
                </span>
                <span
                  className={`text-lg font-bold tracking-wider uppercase ${color.replace('bg-', 'text-')}`}
                >
                  • {label}
                </span>
              </div>
              <p className="max-w-md leading-relaxed text-gray-600 dark:text-gray-400">
                {description}
              </p>
            </div>

            {/* Visual Meter */}
            <div className="space-y-2">
              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressWidth}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full rounded-full shadow-[0_0_12px_rgba(0,0,0,0.1)] ${color}`}
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                <span>Good</span>
                <span>Moderate</span>
                <span>Unhealthy</span>
              </div>
            </div>
          </div>

          {/* Side Badge/Metric */}
          <div className="hidden flex-col items-center justify-center border-l border-gray-100 pl-8 md:flex dark:border-gray-800">
            <div className="text-center">
              <div className="mb-1 text-xs font-bold text-gray-400 uppercase">
                Scale
              </div>
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-indigo-500/20">
                <span className="text-xl font-bold text-indigo-500">1-5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Tip Section */}
        <div className="mt-8 flex gap-3 rounded-2xl border border-indigo-100/50 bg-indigo-50/50 p-4 dark:border-indigo-500/10 dark:bg-indigo-500/5">
          <div className="shrink-0 text-indigo-600 dark:text-indigo-400">
            <Info size={18} />
          </div>
          <p className="text-sm leading-snug text-gray-600 dark:text-gray-300">
            <span className="font-bold text-indigo-900 dark:text-indigo-200">
              Health Tip:
            </span>{' '}
            {aqi <= 2
              ? 'A perfect day for outdoor activities. Enjoy the fresh air!'
              : 'Sensitive groups should reduce prolonged outdoor exertion.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
