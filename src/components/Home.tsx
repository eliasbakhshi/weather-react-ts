import { Info } from "../components/Types";
import { useContext, useEffect, useRef } from "react";
import { Card } from "./Card";
import { useExtractInfo } from "../hooks/useExtractInfo";
import { useUpdateInfo } from "../hooks/useUpdateInfo";
import { InfoContext } from "../context/InfoContext";
import { ContextValues, APIData, UpdatedInfo } from "../components/Types";
import { useGetWeather } from "../hooks/useGetWeather";
import { useGetCoordinates } from "../hooks/useGetCoordinates";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const Home = () => {
  let { data, setData, info, setInfo, loading, setLoading, error, setError }: ContextValues<APIData, UpdatedInfo> = useContext(InfoContext);
  const cityName = useRef({} as HTMLInputElement);
  const [cities, setCities] = useLocalStorage<string[]>("cities", []);

  console.log("cities", cities);
  const citiesName = cities ? cities.map((city) => {return { name: city, count: 1 }}) : [];
  console.log("Coordinates", citiesName);
  const { isLoading: coordinateLoading, data: citiesCoordinates } = useGetCoordinates(citiesName);
  console.log("22", coordinateLoading);

  console.log("2", citiesCoordinates);

  // const { isLoading: testLoading, data: weather } = useGetWeather(citiesCoordinates);

  console.log("cities", data);

  const addCity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let tempCity = cityName.current.value;
    if (tempCity) {
      if (cities?.length) {
        setCities([...cities, tempCity]);
      } else {
        setCities([tempCity]);
      }
    }
  };

  let info2: Info | null = useExtractInfo(data);
  let info3 = useUpdateInfo(info2);
  // console.log("data", weather);
  // console.log("info2", info2);
  // console.log("info3", info3);

  return (
    <main className='container home'>
      <form className='search' onSubmit={addCity}>
        <input type='text' ref={cityName} placeholder='City Name' name='city' />
        <button>Add</button>
      </form>
      <div className='cities'>
        {/* {info3?.map((item) => {
        return <Card data={item} key={item.daysLater}></Card>;
      })} */}
      </div>
    </main>
  );
};
