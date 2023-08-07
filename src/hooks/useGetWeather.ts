import { useQueries } from "react-query";
import axios from "axios";
import { useContext, useEffect } from "react";
import { InfoContext } from "../context/InfoContext";
import { CityList, ContextValues } from "../components/Types";

const getData = (cityInfo: CityList | null) => {
  if (cityInfo?.id) {
    return axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${cityInfo.latitude}&longitude=${cityInfo.longitude}&hourly=temperature_2m&daily=temperature_2m_max&timezone=GMT`).then((info) => {
      // Return data with extra information.
      return {
        ...info.data,
        id: Number(cityInfo.id),
        name: String(cityInfo.name),
        latitude: Number(cityInfo.latitude),
        longitude: Number(cityInfo.longitude),
      };
    });
  }
};

// Get the weather information from the API.
export const useGetWeather = (): void => {
  let { cities, setCities }: ContextValues = useContext(InfoContext);

  let tempCities = cities;
  let status = "";
  let weatherInfo = useQueries(
    cities.map((info) => {
      return {
        queryKey: ["weather-data", info?.name],
        queryFn: () => getData(info),
        enabled: !!info?.id,
        cacheTime: 1000,
      };
    })
  );

  // Return just the information the is needed.
  weatherInfo.forEach((weather) => {
    status = weather.status;
    if (status === "success") {
      let cityID = tempCities.findIndex((city) => city?.id === weather.data.id);
      tempCities[cityID] = {
        id: Number(tempCities[cityID]?.id),
        name: String(weather.data?.name),
        latitude: Number(weather.data?.latitude),
        longitude: Number(weather.data?.longitude),
        timezone: String(weather.data?.timezone),
        hourly: {
          units: String(weather.data?.hourly_units.temperature_2m),
          temperature_2m: weather.data?.hourly.temperature_2m,
          time: weather.data?.hourly.time,
        },
        daily: {
          units: String(weather.data?.daily_units.temperature_2m_max),
          temperature_2m: weather.data?.daily.temperature_2m_max,
          time: weather.data?.daily.time,
        },
      };
    }
  });

  useEffect(() => {
    if (status === "success") {
      setCities(tempCities);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
};
