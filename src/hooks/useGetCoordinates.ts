import { useQueries } from "react-query";
import axios from "axios";
import { CitiesName, CityCoordinate } from "../components/Types";

const getData = async (citiesName: CitiesName) => {
  if (citiesName.name) {

    return axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${citiesName.name}&count=${citiesName.count}&language=en&format=json`);
  }
};
// Get Coordinate for cities
export const useGetCoordinates = (citiesName: CitiesName[]): CityCoordinate[] => {
  let theQueries = useQueries(
    citiesName.map((cityName) => {
      return {
        queryKey: ["city", cityName.name],
        queryFn: () => getData(cityName),
      };
    })
  );

  // Return just the information the is needed.
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
