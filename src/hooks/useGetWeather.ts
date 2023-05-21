import { useQuery } from "react-query";
import axios from "axios";

const getData = () => {
  return axios.get("https://api.open-meteo.com/v1/meteofrance?latitude=52.52&longitude=13.41&hourly=temperature_2m&daily=temperature_2m_max&timezone=GMT");
  // return axios.get("http://localhost:4000/data");
};

export const useGetWeather = (city: string) => {
  return useQuery(["weather-data", city], getData, {
    // cacheTime: 50000
  });
}
