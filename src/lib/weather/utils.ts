import type { ForecastData, DailyForecast, HourlyForecast } from './types';

export class WeatherUtil {
  static getHourlyForecast(data: ForecastData): HourlyForecast[] {
    const now = Date.now();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const endOfDayTimestamp = endOfDay.getTime();

    return data.list
      .filter((item) => {
        const itemTime = item.dt * 1000;
        return itemTime >= now && itemTime <= endOfDayTimestamp;
      })
      .slice(0, 8)
      .map((item) => {
        const date = new Date(item.dt * 1000);
        return {
          time: date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
          temp: Math.round(item.main.temp),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          wind_speed: Math.round(item.wind.speed),
          dt: item.dt,
        };
      });
  }

  static getForecastData(data: ForecastData): DailyForecast[] {
    const dailyData: Record<string, {
      date: string;
      day: string;
      temp_min: number;
      temp_max: number;
      description: string;
      icon: string;
      humidity: number;
      wind_speed: number;
      count: number;
    }> = {};

    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          date: dateKey,
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          wind_speed: item.wind.speed,
          count: 1,
        };
      } else {
        dailyData[dateKey].temp_min = Math.min(
          dailyData[dateKey].temp_min,
          item.main.temp_min
        );
        dailyData[dateKey].temp_max = Math.max(
          dailyData[dateKey].temp_max,
          item.main.temp_max
        );
        dailyData[dateKey].humidity += item.main.humidity;
        dailyData[dateKey].wind_speed += item.wind.speed;
        dailyData[dateKey].count += 1;
      }
    });

    return Object.values(dailyData)
      .map((day) => ({
        date: day.date,
        day: day.day,
        temp_min: Math.round(day.temp_min),
        temp_max: Math.round(day.temp_max),
        description: day.description,
        icon: day.icon,
        humidity: Math.round(day.humidity / day.count),
        wind_speed: Math.round(day.wind_speed / day.count),
      }))
      .slice(0, 7);
  }
}
