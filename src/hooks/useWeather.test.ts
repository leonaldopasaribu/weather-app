import { renderHook, act, waitFor } from '@testing-library/react';
import { useWeather } from './useWeather';
import {
  fetchWeatherByCity,
  fetchForecastByCity,
  fetchWeatherByCoords,
  fetchForecastByCoords,
  WeatherUtil,
} from '@/src/lib/weather';
import type {
  WeatherData,
  ForecastData,
  DailyForecast,
  HourlyForecast,
} from '@/src/lib/weather/types';

// Mock the weather API module
jest.mock('@/src/lib/weather', () => ({
  fetchWeatherByCity: jest.fn(),
  fetchForecastByCity: jest.fn(),
  fetchWeatherByCoords: jest.fn(),
  fetchForecastByCoords: jest.fn(),
  WeatherUtil: {
    getForecastData: jest.fn(),
    getHourlyForecast: jest.fn(),
  },
}));

const mockFetchWeatherByCity = fetchWeatherByCity as jest.MockedFunction<
  typeof fetchWeatherByCity
>;
const mockFetchForecastByCity = fetchForecastByCity as jest.MockedFunction<
  typeof fetchForecastByCity
>;
const mockFetchWeatherByCoords = fetchWeatherByCoords as jest.MockedFunction<
  typeof fetchWeatherByCoords
>;
const mockFetchForecastByCoords = fetchForecastByCoords as jest.MockedFunction<
  typeof fetchForecastByCoords
>;
const mockGetForecastData = WeatherUtil.getForecastData as jest.MockedFunction<
  typeof WeatherUtil.getForecastData
>;
const mockGetHourlyForecast =
  WeatherUtil.getHourlyForecast as jest.MockedFunction<
    typeof WeatherUtil.getHourlyForecast
  >;

describe('useWeather', () => {
  const mockWeatherData: WeatherData = {
    name: 'London',
    sys: {
      country: 'GB',
    },
    main: {
      temp: 20,
      feels_like: 18,
      temp_min: 18,
      temp_max: 22,
      pressure: 1013,
      humidity: 65,
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
    ],
    wind: {
      speed: 5,
    },
  };

  const mockForecastData: ForecastData = {
    list: [
      {
        dt: 1672531200,
        main: {
          temp: 20,
          temp_min: 18,
          temp_max: 22,
          humidity: 65,
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
          },
        ],
        wind: {
          speed: 5,
        },
        dt_txt: '2023-01-01 00:00:00',
      },
    ],
    city: {
      name: 'London',
      country: 'GB',
    },
  };

  const mockDailyForecast: DailyForecast[] = [
    {
      date: '2023-01-01',
      day: 'Sun',
      temp_min: 18,
      temp_max: 22,
      description: 'clear sky',
      icon: '01d',
      humidity: 65,
      wind_speed: 5,
    },
  ];

  const mockHourlyForecast: HourlyForecast[] = [
    {
      time: '00:00',
      temp: 20,
      description: 'clear sky',
      icon: '01d',
      humidity: 65,
      wind_speed: 5,
      dt: 1672531200,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock geolocation API
    Object.defineProperty(global.navigator, 'geolocation', {
      writable: true,
      value: {
        getCurrentPosition: jest.fn(),
      },
    });
  });

  describe('Initial state', () => {
    it('should initialize with default values when hook is first rendered', () => {
      const { result } = renderHook(() => useWeather());

      expect(result.current.city).toBe('');
      expect(result.current.weather).toBeNull();
      expect(result.current.forecast).toEqual([]);
      expect(result.current.hourlyForecast).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('');
    });
  });

  describe('setCity', () => {
    it('should update city state when setCity is called', () => {
      const { result } = renderHook(() => useWeather());

      act(() => {
        result.current.setCity('Paris');
      });

      expect(result.current.city).toBe('Paris');
    });
  });

  describe('handleSearch', () => {
    it('should fetch and set weather data when search is successful', async () => {
      mockFetchWeatherByCity.mockResolvedValue(mockWeatherData);
      mockFetchForecastByCity.mockResolvedValue(mockForecastData);
      mockGetForecastData.mockReturnValue(mockDailyForecast);
      mockGetHourlyForecast.mockReturnValue(mockHourlyForecast);

      const { result } = renderHook(() => useWeather());

      act(() => {
        result.current.setCity('London');
      });

      const mockEvent = {
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent;

      await act(async () => {
        await result.current.handleSearch(mockEvent);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockFetchWeatherByCity).toHaveBeenCalledWith('London');
      expect(mockFetchForecastByCity).toHaveBeenCalledWith('London');
      expect(result.current.weather).toEqual(mockWeatherData);
      expect(result.current.forecast).toEqual(mockDailyForecast);
      expect(result.current.hourlyForecast).toEqual(mockHourlyForecast);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('');
    });

    it('should not fetch data when city input is empty', async () => {
      const { result } = renderHook(() => useWeather());

      const mockEvent = {
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent;

      await act(async () => {
        await result.current.handleSearch(mockEvent);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockFetchWeatherByCity).not.toHaveBeenCalled();
      expect(mockFetchForecastByCity).not.toHaveBeenCalled();
    });

    it('should not fetch data when city contains only whitespace', async () => {
      const { result } = renderHook(() => useWeather());

      act(() => {
        result.current.setCity('   ');
      });

      const mockEvent = {
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent;

      await act(async () => {
        await result.current.handleSearch(mockEvent);
      });

      expect(mockFetchWeatherByCity).not.toHaveBeenCalled();
      expect(mockFetchForecastByCity).not.toHaveBeenCalled();
    });

    it('should set error message when API request fails', async () => {
      const errorMessage = 'City not found';
      mockFetchWeatherByCity.mockRejectedValue(new Error(errorMessage));
      mockFetchForecastByCity.mockResolvedValue(mockForecastData);

      const { result } = renderHook(() => useWeather());

      act(() => {
        result.current.setCity('InvalidCity');
      });

      const mockEvent = {
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent;

      await act(async () => {
        await result.current.handleSearch(mockEvent);
      });

      expect(result.current.error).toBe(errorMessage);
      expect(result.current.weather).toBeNull();
      expect(result.current.forecast).toEqual([]);
      expect(result.current.hourlyForecast).toEqual([]);
      expect(result.current.isLoading).toBe(false);
    });

    it('should use default error message when exception is not an Error instance', async () => {
      mockFetchWeatherByCity.mockRejectedValue('Unknown error');
      mockFetchForecastByCity.mockResolvedValue(mockForecastData);

      const { result } = renderHook(() => useWeather());

      act(() => {
        result.current.setCity('InvalidCity');
      });

      const mockEvent = {
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent;

      await act(async () => {
        await result.current.handleSearch(mockEvent);
      });

      expect(result.current.error).toBe('City not found. Please try again.');
      expect(result.current.weather).toBeNull();
    });

    it('should set loading state when fetching weather data', async () => {
      mockFetchWeatherByCity.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve(mockWeatherData), 100)
          )
      );
      mockFetchForecastByCity.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve(mockForecastData), 100)
          )
      );
      mockGetForecastData.mockReturnValue(mockDailyForecast);
      mockGetHourlyForecast.mockReturnValue(mockHourlyForecast);

      const { result } = renderHook(() => useWeather());

      act(() => {
        result.current.setCity('London');
      });

      const mockEvent = {
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent;

      act(() => {
        result.current.handleSearch(mockEvent);
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it('should clear previous error when performing new search', async () => {
      const { result } = renderHook(() => useWeather());

      // First, set an error
      mockFetchWeatherByCity.mockRejectedValue(new Error('First error'));
      mockFetchForecastByCity.mockResolvedValue(mockForecastData);

      act(() => {
        result.current.setCity('InvalidCity');
      });

      const mockEvent = {
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent;

      await act(async () => {
        await result.current.handleSearch(mockEvent);
      });

      expect(result.current.error).toBe('First error');

      // Now perform a successful search
      mockFetchWeatherByCity.mockResolvedValue(mockWeatherData);
      mockFetchForecastByCity.mockResolvedValue(mockForecastData);
      mockGetForecastData.mockReturnValue(mockDailyForecast);
      mockGetHourlyForecast.mockReturnValue(mockHourlyForecast);

      act(() => {
        result.current.setCity('London');
      });

      await act(async () => {
        await result.current.handleSearch(mockEvent);
      });

      expect(result.current.error).toBe('');
      expect(result.current.weather).toEqual(mockWeatherData);
    });
  });

  describe('handleGetCurrentLocation', () => {
    it('should fetch weather data when geolocation is successful', async () => {
      const mockPosition = {
        coords: {
          latitude: 51.5074,
          longitude: -0.1278,
        },
      };

      (global.navigator.geolocation.getCurrentPosition as jest.Mock) = jest.fn(
        (success) => success(mockPosition)
      );

      mockFetchWeatherByCoords.mockResolvedValue(mockWeatherData);
      mockFetchForecastByCoords.mockResolvedValue(mockForecastData);
      mockGetForecastData.mockReturnValue(mockDailyForecast);
      mockGetHourlyForecast.mockReturnValue(mockHourlyForecast);

      const { result } = renderHook(() => useWeather());

      await act(async () => {
        result.current.handleGetCurrentLocation();
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockFetchWeatherByCoords).toHaveBeenCalledWith(51.5074, -0.1278);
      expect(mockFetchForecastByCoords).toHaveBeenCalledWith(51.5074, -0.1278);
      expect(result.current.weather).toEqual(mockWeatherData);
      expect(result.current.forecast).toEqual(mockDailyForecast);
      expect(result.current.hourlyForecast).toEqual(mockHourlyForecast);
      expect(result.current.city).toBe('London');
      expect(result.current.error).toBe('');
    });

    it('should set error message when geolocation is not supported by browser', () => {
      Object.defineProperty(global.navigator, 'geolocation', {
        writable: true,
        value: undefined,
      });

      const { result } = renderHook(() => useWeather());

      act(() => {
        result.current.handleGetCurrentLocation();
      });

      expect(result.current.error).toBe(
        'Geolocation is not supported by your browser'
      );
      expect(result.current.isLoading).toBe(false);
    });

    it('should set error message when geolocation permission is denied', async () => {
      (global.navigator.geolocation.getCurrentPosition as jest.Mock) = jest.fn(
        (success, error) => error()
      );

      const { result } = renderHook(() => useWeather());

      await act(async () => {
        result.current.handleGetCurrentLocation();
      });

      await waitFor(() => {
        expect(result.current.error).toBe('Unable to retrieve your location');
      });

      expect(result.current.isLoading).toBe(false);
    });

    it('should set error message when API request fails during geolocation', async () => {
      const mockPosition = {
        coords: {
          latitude: 51.5074,
          longitude: -0.1278,
        },
      };

      (global.navigator.geolocation.getCurrentPosition as jest.Mock) = jest.fn(
        (success) => success(mockPosition)
      );

      const errorMessage = 'API error';
      mockFetchWeatherByCoords.mockRejectedValue(new Error(errorMessage));
      mockFetchForecastByCoords.mockResolvedValue(mockForecastData);

      const { result } = renderHook(() => useWeather());

      await act(async () => {
        result.current.handleGetCurrentLocation();
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBe(errorMessage);
      expect(result.current.weather).toBeNull();
      expect(result.current.forecast).toEqual([]);
      expect(result.current.hourlyForecast).toEqual([]);
    });

    it('should use default error message when geolocation throws non-Error exception', async () => {
      const mockPosition = {
        coords: {
          latitude: 51.5074,
          longitude: -0.1278,
        },
      };

      (global.navigator.geolocation.getCurrentPosition as jest.Mock) = jest.fn(
        (success) => success(mockPosition)
      );

      mockFetchWeatherByCoords.mockRejectedValue('Unknown error');
      mockFetchForecastByCoords.mockResolvedValue(mockForecastData);

      const { result } = renderHook(() => useWeather());

      await act(async () => {
        result.current.handleGetCurrentLocation();
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBe('Unable to fetch weather data');
      expect(result.current.weather).toBeNull();
    });

    it('should set loading state when fetching location data', async () => {
      const mockPosition = {
        coords: {
          latitude: 51.5074,
          longitude: -0.1278,
        },
      };

      (global.navigator.geolocation.getCurrentPosition as jest.Mock) = jest.fn(
        (success) => setTimeout(() => success(mockPosition), 100)
      );

      mockFetchWeatherByCoords.mockResolvedValue(mockWeatherData);
      mockFetchForecastByCoords.mockResolvedValue(mockForecastData);
      mockGetForecastData.mockReturnValue(mockDailyForecast);
      mockGetHourlyForecast.mockReturnValue(mockHourlyForecast);

      const { result } = renderHook(() => useWeather());

      act(() => {
        result.current.handleGetCurrentLocation();
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it('should clear previous error when getting current location', async () => {
      const mockPosition = {
        coords: {
          latitude: 51.5074,
          longitude: -0.1278,
        },
      };

      const { result } = renderHook(() => useWeather());

      // First, set an error by trying search with invalid city
      mockFetchWeatherByCity.mockRejectedValue(new Error('City not found'));
      mockFetchForecastByCity.mockResolvedValue(mockForecastData);

      act(() => {
        result.current.setCity('InvalidCity');
      });

      const mockEvent = {
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent;

      await act(async () => {
        await result.current.handleSearch(mockEvent);
      });

      expect(result.current.error).toBe('City not found');

      // Now use geolocation successfully
      (global.navigator.geolocation.getCurrentPosition as jest.Mock) = jest.fn(
        (success) => success(mockPosition)
      );

      mockFetchWeatherByCoords.mockResolvedValue(mockWeatherData);
      mockFetchForecastByCoords.mockResolvedValue(mockForecastData);
      mockGetForecastData.mockReturnValue(mockDailyForecast);
      mockGetHourlyForecast.mockReturnValue(mockHourlyForecast);

      await act(async () => {
        result.current.handleGetCurrentLocation();
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBe('');
      expect(result.current.weather).toEqual(mockWeatherData);
    });
  });

  describe('Return value', () => {
    it('should return all expected properties when hook is used', () => {
      const { result } = renderHook(() => useWeather());

      expect(result.current).toHaveProperty('city');
      expect(result.current).toHaveProperty('setCity');
      expect(result.current).toHaveProperty('weather');
      expect(result.current).toHaveProperty('forecast');
      expect(result.current).toHaveProperty('hourlyForecast');
      expect(result.current).toHaveProperty('isLoading');
      expect(result.current).toHaveProperty('error');
      expect(result.current).toHaveProperty('handleSearch');
      expect(result.current).toHaveProperty('handleGetCurrentLocation');
    });

    it('should return callable functions when hook is used', () => {
      const { result } = renderHook(() => useWeather());

      expect(typeof result.current.setCity).toBe('function');
      expect(typeof result.current.handleSearch).toBe('function');
      expect(typeof result.current.handleGetCurrentLocation).toBe('function');
    });
  });
});
