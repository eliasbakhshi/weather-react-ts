import { Info } from "../components/Types";
import { useContext, useEffect, useRef, useState } from "react";
import { Card } from "./Card";
import { useExtractInfo } from "../hooks/useExtractInfo";
import { useUpdateInfo } from "../hooks/useUpdateInfo";
import { InfoContext } from "../context/InfoContext";
import { ContextValues, APIData, WeatherInfo } from "../components/Types";
import { useGetWeather } from "../hooks/useGetWeather";
import { useGetCoordinates } from "../hooks/useGetCoordinates";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Search } from "./Search";

export const Home = () => {
  let { data, setData, info, setInfo, cities, setCities, loading, setLoading, error, setError }: ContextValues<APIData, (null | WeatherInfo)[] | null> = useContext(InfoContext);



  // const citiesName = cities
  //   ? cities.map((city) => {
  //       return { name: city, count: 1 };
  //     })
  //   : [];

  console.log("cities", cities);

  // Get the coordination for the cities.
  const { status: coordinatesStatus, data: coordinatesData } = useGetCoordinates(cities);
  console.log("citiesCoordinates", coordinatesStatus);
  console.log("coordinatesData", coordinatesData);

  // Set the weather for the cities.
  let { status: weatherStatus, data: weatherData } = useGetWeather(coordinatesData);
  useEffect(() => {
    if (weatherStatus) {
      setInfo(weatherData);
    }
  }, [weatherStatus]);
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
