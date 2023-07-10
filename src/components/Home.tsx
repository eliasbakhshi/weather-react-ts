import { Info } from "../components/Types";
import { useContext, useEffect, useRef } from "react";
import { Card } from "./Card";
import { useExtractInfo } from "../hooks/useExtractInfo";
import { useUpdateInfo } from "../hooks/useUpdateInfo";
import { InfoContext } from "../context/InfoContext";
import { ContextValues, APIData, WeatherInfo } from "../components/Types";
import { useGetWeather } from "../hooks/useGetWeather";
import { useGetCoordinates } from "../hooks/useGetCoordinates";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const Home = () => {
  let { data, setData, info, setInfo, loading, setLoading, error, setError }: ContextValues<APIData, WeatherInfo[]> = useContext(InfoContext);
  const cityName = useRef({} as HTMLInputElement);
  const [cities, setCities] = useLocalStorage<string[]>("cities", []);

  const citiesName = cities
    ? cities.map((city) => {
        return { name: city, count: 1 };
      })
    : [];

  const citiesCoordinates = useGetCoordinates(citiesName);
  let citiesWeather = useGetWeather(citiesCoordinates);
  console.log("rr", cities);
  console.log("rr222222222", citiesName);
  console.log("citiesCoordinates", citiesCoordinates);
  // console.log("citiesWeather", citiesWeather);
  // useEffect(() => {
  //   setInfo(citiesWeather);
  // }, [citiesWeather]);

  // Add city to the list.
  const addCity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let tempCity = cityName.current.value;
    if (tempCity) {
      if (cities?.length && !cities?.includes(tempCity)) {
        setCities([...cities, tempCity]);
      } else if (!cities?.length){
        setCities([tempCity]);
      }
    }
  };

  return (
    <main className='container home'>
      <div className='header'>
        <form className='search' onSubmit={addCity}>
          <input type='text' ref={cityName} placeholder='City Name' name='city' />
          <button>Add</button>
        </form>
      </div>
      <div className='cities'>
        {citiesWeather.map((item) => {
          return item.id ? <Card data={item} key={item.id.toString()} /> : "";
        })}
      </div>
    </main>
  );
};
