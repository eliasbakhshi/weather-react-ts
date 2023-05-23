import { useQuery } from "react-query";
import axios from "axios";
import { CitiesInfo } from "../components/Types";

const getData = (cityinfo : CitiesInfo) => {
  return axios.get(`https://api.open-meteo.com/v1/meteofrance?latitude=${cityinfo.latitude}&longitude=${cityinfo.longitude}&hourly=temperature_2m&daily=temperature_2m_max&timezone=GMT`);
  // return axios.get("http://localhost:4000/data");
};

export const useGetWeather = (cityInfo: CitiesInfo) => {
  return useQuery(["weather-data", cityInfo], () => getData(cityInfo), {
    // cacheTime: 50000
  });
}
