import { useQueries } from "react-query";
import axios from "axios";
import { CitiesName, CityCoordinate } from "../components/Types";

const getData = async (citiesName: CitiesName) => {
  return axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${citiesName.name}&count=${citiesName.count}&language=en&format=json`);
};

export const useGetCoordinates = (citiesName: CitiesName[]): CityCoordinate[] => {
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
      id: Number(theQuery.data?.data?.results[0].id),
      name: String(theQuery.data?.data?.results[0].name),
      latitude: Number(theQuery.data?.data?.results[0].latitude),
      longitude: Number(theQuery.data?.data?.results[0].longitude),
    };
  });
  return res;
};
