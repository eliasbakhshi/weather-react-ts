import { useQuery } from "react-query";
import axios from "axios";
import { CitiesName } from "../components/Types";

const getData = async (citiesName: CitiesName)  => {
  let data = citiesName.map( async city => {
    let info = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city.name}&count=${city.count}&language=en&format=json`);
    return {
      name: city.name,
      count: city.count,
      latitude: info.data.results[0].latitude,
      longitude: info.data.results[0].longitude,
    };
  })
  return data;


  // return axios.get("http://localhost:4000/data");
};

export const useGetCoordinates = (citiesName: CitiesName) => {
  return useQuery(["coordinate-data", citiesName], () => getData(citiesName), {
    // cacheTime: 50000
  });
};
