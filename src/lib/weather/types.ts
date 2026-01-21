export interface WeatherData {
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
  };
}

export interface DailyForecast {
  date: string;
  day: string;
  temp_min: number;
  temp_max: number;
  description: string;
  icon: string;
  humidity: number;
  wind_speed: number;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  wind_speed: number;
  dt: number;
}

export interface AirPollutionData {
  coord: {
    lon: number;
    lat: number;
  };
  list: Array<{
    main: {
      aqi: number; // Air Quality Index: 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor
    };
    components: {
      co: number; // Carbon monoxide, μg/m3
      no: number; // Nitrogen monoxide, μg/m3
      no2: number; // Nitrogen dioxide, μg/m3
      o3: number; // Ozone, μg/m3
      so2: number; // Sulphur dioxide, μg/m3
      pm2_5: number; // Fine particles matter, μg/m3
      pm10: number; // Coarse particulate matter, μg/m3
      nh3: number; // Ammonia, μg/m3
    };
    dt: number;
  }>;
}

export interface AirQualityInfo {
  aqi: number;
  label: string;
  description: string;
  color: string;
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
}

// Geocoding API types for autocomplete
export interface GeocodingLocation {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface LocationSuggestion {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
  displayName: string;
}
