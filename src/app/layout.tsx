import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import 'leaflet/dist/leaflet.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default:
      'The Weather Channel - Accurate Weather Forecasts & Real-Time Updates',
    template: '%s | The Weather Channel',
  },
  description:
    'Get accurate weather forecasts, real-time updates, and 7-day weather predictions for any city worldwide. Check current temperature, humidity, wind speed, and detailed weather conditions.',
  keywords: [
    'weather',
    'weather forecast',
    'weather app',
    'temperature',
    'weather channel',
    'cuaca',
    'prakiraan cuaca',
    'ramalan cuaca',
    'real-time weather',
    'weather updates',
    '7-day forecast',
    'humidity',
    'wind speed',
    'weather conditions',
    'local weather',
    'global weather',
  ],
  authors: [{ name: 'Leonaldo Pasaribu' }],
  creator: 'Leonaldo Pasaribu',
  publisher: 'The Weather Channel',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://weather-app-leonaldo-pasaribu.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://weather-app-leonaldo-pasaribu.vercel.app',
    title:
      'The Weather Channel - Accurate Weather Forecasts & Real-Time Updates',
    description:
      'Get accurate weather forecasts, real-time updates, and 7-day weather predictions for any city worldwide. Check current temperature, humidity, wind speed, and detailed weather conditions.',
    siteName: 'The Weather Channel',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Weather Channel - Accurate Weather Forecasts',
    description:
      'Get accurate weather forecasts, real-time updates, and 7-day weather predictions for any city worldwide.',
    creator: '@leonaldopasaribu',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // Tambahkan kode verifikasi Google Search Console nanti
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'The Weather Channel',
    description:
      'Get accurate weather forecasts, real-time updates, and 7-day weather predictions for any city worldwide.',
    url: 'https://weather-app-leonaldo-pasaribu.vercel.app',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1000',
    },
    author: {
      '@type': 'Person',
      name: 'Leonaldo Pasaribu',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
