import { useQueries } from "react-query";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { InfoContext } from "../context/InfoContext";

import { CityCoordinate, WeatherInfo, CityList, ContextValues, APIData } from "../components/Types";





const getData = (cityInfo: CityList | null) => {
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
export const useGetWeather = (cityInfo: (null | CityList)[]): void => {
  console.log("cityInfo", cityInfo);

  let { data, setData, info, setInfo, cities, setCities, loading, setLoading, cityResult, setCityResult, error, setError }: ContextValues<APIData, (null | WeatherInfo)[]> = useContext(InfoContext);

  let status = "";
  let weatherInfo = useQueries(
    cityInfo.map((info) => {
      return {
        queryKey: ["weather-data", info?.name],
        queryFn: () => getData(info),
        enabled: !!info?.id,
      };
    })
  );

  // Return just the information the is needed.
  let res = weatherInfo.map((weather) => {
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

  console.log("res", res);


   useEffect(() => {
    if (status) {
      setInfo(res);
    }
  }, [status]);
  console.log("info", info);
  console.log("cities", cities);


  // return { status: status, data };
};
