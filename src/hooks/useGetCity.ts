import { useQueries, useQuery } from "react-query";
import axios from "axios";
import { CityResult, CityData } from "../components/Types";

const getData = (cityName: string) => {
  return axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=5&language=en&format=json`);
};

export const useGetCity = (cityName: string): { status: string, data: CityData } => {
  let res = useQuery({
    queryKey: ["cityName", cityName],
    queryFn: () => getData(cityName),
  });

  let data =
    res.status === "success" && res.data?.data?.hasOwnProperty("results")
      ? res.data?.data?.results.map((result: CityData): CityData => {
          return {
            id: Number(result.id),
            name: String(result.name),
            state: String(result.admin1),
            country: String(result.country),
            latitude: Number(result.latitude),
            longitude: Number(result.longitude),
          };
        })
      : null;

  return { status: res.status, data: data };
};
