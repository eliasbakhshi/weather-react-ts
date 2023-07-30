import { useParams } from "react-router-dom";
import { useContext } from "react";
import { InfoContext } from "../context/InfoContext";
import { ContextValues } from "./Types";
import { useGetWeather } from "../hooks/useGetWeather";


export const CityDetails = () => {
  const { id } = useParams();
  let { citiesInfo, cities }: ContextValues = useContext(InfoContext);
  
  useGetWeather();

  let cityInfo2 = citiesInfo.filter((city) => city?.id === Number(id));

  console.log({cityInfo2, cities, citiesInfo});

  return <div className='container'>
    <h1>{`City Details for ${cityInfo2}`}</h1>

  </div>;
};
