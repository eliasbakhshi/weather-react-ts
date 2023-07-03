import { useQueries } from "react-query";
import axios from "axios";
import { CitiesName } from "../components/Types";

const getData = async (citiesName: { name: string; count?: number }) => {
  return axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${citiesName.name}&count=${citiesName.count}&language=en&format=json`);
};

export const useGetCoordinates = (citiesName: CitiesName) => {
  let theQueries = useQueries(
    citiesName.map((cityName) => {
      return {
        queryKey: ["post", cityName.name],
        queryFn: () => getData(cityName),
      };
    })
  );
  let res = theQueries.map((theQuery) => {
    return {
          name: theQuery.data?.data?.results[0].name,
          latitude: theQuery.data?.data?.results[0].latitude,
          longitude: theQuery.data?.data?.results[0].longitude,
        }
  });
  return res;
};
