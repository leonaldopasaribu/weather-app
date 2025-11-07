import type { ForecastData, DailyForecast } from "./types";

export class WeatherUtil {
  static getForecastData(data: ForecastData): DailyForecast[] {
    const dailyData: { [key: string]: any } = {};

    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          date: dateKey,
          day: date.toLocaleDateString("en-US", { weekday: "short" }),
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
      .map((day: any) => ({
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
