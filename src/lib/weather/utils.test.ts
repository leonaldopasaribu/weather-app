import { WeatherUtil } from './utils';
import type { ForecastData } from './types';

describe('WeatherUtil', () => {
  describe('getForecastData', () => {
    it('should process forecast data correctly when given valid data', () => {
      const mockData: ForecastData = {
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
          {
            dt: 1672542000,
            main: {
              temp: 21,
              temp_min: 19,
              temp_max: 23,
              humidity: 60,
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
              speed: 6,
            },
            dt_txt: '2023-01-01 03:00:00',
          },
        ],
        city: {
          name: 'Test City',
          country: 'US',
        },
      };

      const result = WeatherUtil.getForecastData(mockData);

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        temp_min: 18,
        temp_max: 23,
        description: 'clear sky',
        icon: '01d',
        humidity: 63,
        wind_speed: 6,
      });
    });

    it('should return maximum of 7 days when given more than 7 days of data', () => {
      const mockList = Array.from({ length: 40 }, (_, i) => ({
        dt: 1672531200 + i * 86400,
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
        dt_txt: `2023-01-${String(i + 1).padStart(2, '0')} 00:00:00`,
      }));

      const mockData: ForecastData = {
        list: mockList,
        city: {
          name: 'Test City',
          country: 'US',
        },
      };

      const result = WeatherUtil.getForecastData(mockData);

      expect(result).toHaveLength(7);
    });

    it('should aggregate multiple entries when given same day data', () => {
      const mockData: ForecastData = {
        list: [
          {
            dt: 1672531200,
            main: {
              temp: 20,
              temp_min: 15,
              temp_max: 25,
              humidity: 70,
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
              speed: 4,
            },
            dt_txt: '2023-01-01 00:00:00',
          },
          {
            dt: 1672542000,
            main: {
              temp: 22,
              temp_min: 18,
              temp_max: 28,
              humidity: 80,
            },
            weather: [
              {
                id: 800,
                main: 'Clear',
                description: 'sunny',
                icon: '01d',
              },
            ],
            wind: {
              speed: 6,
            },
            dt_txt: '2023-01-01 03:00:00',
          },
        ],
        city: {
          name: 'Test City',
          country: 'US',
        },
      };

      const result = WeatherUtil.getForecastData(mockData);

      expect(result).toHaveLength(1);
      expect(result[0].temp_min).toBe(15);
      expect(result[0].temp_max).toBe(28);
      expect(result[0].humidity).toBe(75);
      expect(result[0].wind_speed).toBe(5);
    });
  });
});
