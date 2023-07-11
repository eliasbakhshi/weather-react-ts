import { useQueries } from "react-query";
import axios from "axios";
import { CityCoordinate, WeatherInfo } from "../components/Types";

const getData = (cityInfo: CityCoordinate | null) => {
  if (cityInfo?.id) {
    return axios.get(`https://api.open-meteo.com/v1/meteofrance?latitude=${cityInfo.latitude}&longitude=${cityInfo.longitude}&hourly=temperature_2m&daily=temperature_2m_max&timezone=GMT`).then((info) => {
      // Return data with extra information.
      return {
        id: Number(cityInfo.id),
        name: String(cityInfo.name),
        data: info.data,
      };
    });
  }
};

// Get the weather information from the API.
export const useGetWeather = (cityInfo: (null | CityCoordinate)[]): { status: string; data: (null | WeatherInfo)[] } => {
  let status = "";
  let weatherInfo = useQueries(
    cityInfo.map((info) => {
      return {
        queryKey: ["weather-data", info?.name],
        queryFn: () => getData(info),
        enabled: !!info?.id,
      };
    }) ?? []
  );

  // Return just the information the is needed.
  let info = weatherInfo.map((weather) => {
    status = weather.status;
    if (status === "success") {
      return {
        id: Number(weather.data?.id),
        name: String(weather.data?.name),
        latitude: Number(weather.data?.data?.latitude),
        longitude: Number(weather.data?.data?.longitude),
        timezone: String(weather.data?.data?.timezone),
        hourly: {
          units: String(weather.data?.data?.hourly_units.temperature_2m),
          temperature_2m: Array(weather.data?.data?.hourly.temperature_2m),
          time: Array(weather.data?.data?.hourly.time),
        },
        daily: {
          units: String(weather.data?.data?.daily_units.temperature_2m_max),
          temperature_2m: Array(weather.data?.data?.daily.temperature_2m_max),
          time: Array(weather.data?.data?.daily.time),
        },
      };
    } else {
      return null;
    }
  });

  return { status: status, data: info };
};
