'use client';

import { motion } from 'framer-motion';
import { CloudSun, Sparkles } from 'lucide-react';

export default function WelcomeHeader() {
  return (
    <div className="relative mb-12 flex flex-col items-center justify-center px-4 pt-8 text-center sm:mb-16">
      {/* Visual Icon Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-6"
      >
        {/* Decorative Glow */}
        <div className="absolute inset-0 scale-150 bg-blue-500/20 blur-[60px] dark:bg-indigo-500/30" />

        <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-white/20 to-white/5 shadow-2xl ring-1 ring-white/30 backdrop-blur-2xl sm:h-32 sm:w-32">
          <CloudSun
            size={60}
            strokeWidth={1.5}
            className="text-white drop-shadow-2xl sm:size-20"
          />

          {/* Floating Sparkles */}
          <motion.div
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-2 -right-2 text-yellow-300"
          >
            <Sparkles size={24} fill="currentColor" />
          </motion.div>
        </div>
      </motion.div>

      {/* Main Title with Shimmer Effect */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="relative mb-3 inline-block">
          <span className="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-4xl font-black tracking-[0.2em] text-transparent uppercase sm:text-6xl md:text-7xl">
            The Weather Channel
          </span>
          {/* Accent Line */}
          <div className="mt-2 h-1 w-full scale-x-50 rounded-full bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50" />
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-3"
      >
        <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/30" />
        <p className="max-w-[280px] text-xs font-bold tracking-[0.3em] text-blue-100/80 uppercase sm:max-w-none sm:text-sm">
          Precision Metrics • Real-time Data
        </p>
        <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/30" />
      </motion.div>

      {/* Floating Particles (Optional) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-1 w-1 animate-ping rounded-full bg-white/40" />
        <div className="absolute top-20 right-1/3 h-1 w-1 animate-pulse rounded-full bg-white/20" />
      </div>
    </div>
  );
}
