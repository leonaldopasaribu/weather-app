import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Weather Channel - Accurate Weather Forecasts',
    short_name: 'Weather App',
    description:
      'Get accurate weather forecasts, real-time updates, and 7-day weather predictions for any city worldwide.',
    start_url: '/',
    display: 'standalone',
    background_color: '#4F46E5',
    theme_color: '#4F46E5',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['weather', 'utilities', 'productivity'],
    lang: 'en',
  };
}
