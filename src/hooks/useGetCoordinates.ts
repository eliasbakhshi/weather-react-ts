import { useQueries } from "react-query";
import axios from "axios";
import { CitiesName, CityCoordinate } from "../components/Types";

const getData = async (cityName: string | undefined) => {
  if (cityName) {
    return axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`);
  }
};
// Get Coordinate for cities
export const useGetCoordinates = (citiesName: CitiesName[]): { status: string; data: (null | CityCoordinate)[] } => {
  let status = "";
  let theQueries = useQueries(
    citiesName.map((cityName) => {
      return {
        queryKey: ["city", cityName],
        queryFn: () => getData(cityName),
      };
    })
  );

  // Return just the information the is needed.
  let res = theQueries.map((theQuery) => {
    status = theQuery.status;

    if (status === "success" && theQuery.data?.data?.hasOwnProperty("results")) {
      return {
        id: Number(theQuery.data?.data?.results[0].id),
        name: String(theQuery.data?.data?.results[0].name),
        latitude: Number(theQuery.data?.data?.results[0].latitude),
        longitude: Number(theQuery.data?.data?.results[0].longitude),
      };
    } else {
      return null;
    }
  });
  return { status: status, data: res };
};
