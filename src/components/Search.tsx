import { useContext, useRef } from "react";

import { ContextValues, APIData, WeatherInfo } from "../components/Types";
import { InfoContext } from "../context/InfoContext";

export const Search = () => {
  let { data, setData, info, setInfo, cities, setCities, loading, setLoading, error, setError }: ContextValues<APIData, (null | WeatherInfo)[] | null> = useContext(InfoContext);

  const cityName = useRef({} as HTMLInputElement);

  // Add city to the list.
  const addCity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let tempCity = cityName.current.value;
    if (tempCity) {
      if (cities?.length && !cities?.includes(tempCity)) {
        setCities([...cities, tempCity]);
      } else if (!cities?.length) {
        setCities([tempCity]);
      }
    }
  };

  return (
    <form className='search' onSubmit={addCity}>
      <input type='text' ref={cityName} placeholder='City Name' name='city' />
      <button>Add</button>
    </form>
  );
};
