export class WeatherBackgroundUtil {
  static getBackgroundStyle(
    weatherCondition: string | undefined,
    isDark: boolean
  ): React.CSSProperties {
    if (!weatherCondition) {
      // Default background
      return {
        background: isDark
          ? 'linear-gradient(135deg, #050a1e 0%, #0f1729 50%, #1a1e35 100%)'
          : 'linear-gradient(135deg, #6366f1 0%, #3b82f6 50%, #06b6d4 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradient 15s ease infinite',
      };
    }

    const condition = weatherCondition.toLowerCase();

    // Rain conditions
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return {
        backgroundImage: isDark
          ? 'linear-gradient(rgba(30, 41, 59, 0.85), rgba(15, 23, 42, 0.85)), url("https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=2000")'
          : 'linear-gradient(rgba(71, 85, 105, 0.7), rgba(51, 65, 85, 0.7)), url("https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      };
    }

    // Clear/Sunny conditions
    if (condition.includes('clear')) {
      return {
        backgroundImage: isDark
          ? 'linear-gradient(rgba(30, 58, 138, 0.7), rgba(30, 27, 75, 0.7)), url("https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=2000")'
          : 'linear-gradient(rgba(251, 191, 36, 0.5), rgba(245, 158, 11, 0.5)), url("https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      };
    }

    // Cloudy conditions
    if (condition.includes('cloud')) {
      return {
        backgroundImage: isDark
          ? 'linear-gradient(rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.8)), url("https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=2000")'
          : 'linear-gradient(rgba(156, 163, 175, 0.6), rgba(107, 114, 128, 0.6)), url("https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      };
    }

    // Thunderstorm conditions
    if (condition.includes('thunderstorm')) {
      return {
        backgroundImage: isDark
          ? 'linear-gradient(rgba(15, 23, 42, 0.85), rgba(0, 0, 0, 0.85)), url("https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=2000")'
          : 'linear-gradient(rgba(55, 65, 81, 0.75), rgba(31, 41, 55, 0.75)), url("https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      };
    }

    // Snow conditions
    if (condition.includes('snow')) {
      return {
        backgroundImage: isDark
          ? 'linear-gradient(rgba(51, 65, 85, 0.75), rgba(30, 41, 59, 0.75)), url("https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=2000")'
          : 'linear-gradient(rgba(219, 234, 254, 0.6), rgba(191, 219, 254, 0.6)), url("https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      };
    }

    // Mist/Fog conditions
    if (
      condition.includes('mist') ||
      condition.includes('fog') ||
      condition.includes('haze')
    ) {
      return {
        backgroundImage: isDark
          ? 'linear-gradient(rgba(55, 65, 81, 0.8), rgba(31, 41, 55, 0.8)), url("https://images.unsplash.com/photo-1487621167305-5d248087c724?q=80&w=2000")'
          : 'linear-gradient(rgba(209, 213, 219, 0.7), rgba(156, 163, 175, 0.7)), url("https://images.unsplash.com/photo-1487621167305-5d248087c724?q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      };
    }

    // Default fallback
    return {
      background: isDark
        ? 'linear-gradient(to bottom right, #1a1a2e, #16213e, #0f3460)'
        : 'linear-gradient(to bottom right, #667eea, #764ba2, #f093fb)',
    };
  }

  /**
   * Get weather description for accessibility
   */
  static getWeatherDescription(weatherCondition: string | undefined): string {
    if (!weatherCondition) return 'Default weather background';

    const condition = weatherCondition.toLowerCase();

    if (condition.includes('rain') || condition.includes('drizzle')) {
      return 'Rainy weather background with gray tones';
    }
    if (condition.includes('clear')) {
      return 'Sunny weather background with warm colors';
    }
    if (condition.includes('cloud')) {
      return 'Cloudy weather background with gray tones';
    }
    if (condition.includes('thunderstorm')) {
      return 'Thunderstorm background with dark tones';
    }
    if (condition.includes('snow')) {
      return 'Snowy weather background with cool tones';
    }
    if (
      condition.includes('mist') ||
      condition.includes('fog') ||
      condition.includes('haze')
    ) {
      return 'Misty weather background with soft gray tones';
    }

    return 'Default weather background';
  }
}
