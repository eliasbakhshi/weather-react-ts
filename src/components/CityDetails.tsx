import { useParams } from "react-router-dom";
import { useContext } from "react";
import { InfoContext } from "../context/InfoContext";
import { ContextValues } from "./Types";
import { useGetWeather } from "../hooks/useGetWeather";


export const CityDetails = () => {
  const { id } = useParams();
  let { cities }: ContextValues = useContext(InfoContext);

  useGetWeather();

  let cityInfo = cities.filter((city) => city?.id === Number(id))[0];

  console.log({cityInfo, cities });

  return <div className='city-details'>
    <div className="city-info"></div>
    <div className="days"></div>
    <div className="hours"></div>
    <h1>{`City Details for ${cityInfo?.name}`}</h1>
  </div>;
};
