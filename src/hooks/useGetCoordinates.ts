import { useQueries } from "react-query";
import axios from "axios";
import { CitiesName, CityCoordinate } from "../components/Types";

const getData = async (citiesName: CitiesName) => {
  if (citiesName.name) {
    return axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${citiesName.name}&count=${citiesName.count}&language=en&format=json`);
  }
};
// Get Coordinate for cities
export const useGetCoordinates = (citiesName: CitiesName[]): { status: string; data: (null | CityCoordinate)[]} => {
  let status = "";
  let theQueries = useQueries(
    citiesName.map((cityName) => {
      return {
        queryKey: ["city", cityName.name],
        queryFn: () => getData(cityName),
      };
    })
  );

  console.log("theQueries", theQueries);
  let data = [];
  // Return just the information the is needed.
  let res = theQueries.map((theQuery) => {
    status = theQuery.status;
    if (status === "success") {
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
  return {status: status, data: res};
};
