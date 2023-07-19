import { useContext, useEffect, useRef, useState } from "react";
import { Card } from "./Card";
import { InfoContext } from "../context/InfoContext";
import { ContextValues, APIData, WeatherInfo } from "../components/Types";
import { useGetWeather } from "../hooks/useGetWeather";
import { useGetCoordinates } from "../hooks/useGetCoordinates";
import { Search } from "./Search";

export const Home = () => {
  let { data, setData, info, setInfo, cities, setCities, loading, setLoading, error, setError }: ContextValues<APIData, (null | WeatherInfo)[] | null> = useContext(InfoContext);

  // Get the coordination for the cities.
  // const { status: coordinatesStatus, data: coordinatesData } = useGetCoordinates(cities);
  // console.log("citiesCoordinates", coordinatesStatus);
  // console.log("coordinatesData", coordinatesData);

  // Set the weather for the cities.

  useGetWeather(cities);
  // console.log("weatherData", weatherData);
  // console.log("weatherStatus", weatherStatus);

  // useEffect(() => {
  //   if (weatherStatus) {
  //     setInfo(weatherData);
  //   }
  // }, [weatherStatus]);
  // console.log("info", info);

  return (
    <main className='container home'>
      <div className='header'>
        <Search />
      </div>
      <div className='cities'>
        {info?.map((item) => {
          return item?.id ? <Card data={item} key={item.id.toString()} /> : "";
        })}
      </div>
    </main>
  );
};
