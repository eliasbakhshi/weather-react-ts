import { useQuery } from "react-query";
import axios from "axios";
import { CityData, SetAction } from "../components/Types";

const getData = (cityName: string, setCityResult: SetAction<CityData[]>) => {
  return axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=5&language=en&format=json`).then((res) => {
    let citiesData =
      res.status === 200 && res.data?.hasOwnProperty("results")
        ? res.data?.results.map((result: CityData): CityData => {
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

    setCityResult(citiesData);
  });
};

export const useGetCity = (cityName: React.MutableRefObject<HTMLInputElement>, setCityResult: SetAction<CityData[]>) => {
  let res = useQuery({
    queryKey: ["cityName", cityName.current.value],
    queryFn: () => getData(cityName.current.value, setCityResult),
    enabled: false,
  });

  return { data: res };
};
