import { useContext, useRef, useEffect, useState } from "react";
import { ContextValues, APIData, WeatherInfo, CityData, CityList } from "../components/Types";
import { InfoContext } from "../context/InfoContext";
import { useGetCity } from "../hooks/useGetCity";

// TODO: - Check if user want to choose the same city that already is in the list or not
// TODO: - Put info of the first searched city in the search bar with a the name as placeholder

export const Search = () => {
  let { data, setData, info, setInfo, cities, setCities, cityResult, setCityResult, loading, setLoading, error, setError }: ContextValues<APIData, (null | WeatherInfo)[] | null> = useContext(InfoContext);
  const searchedCity = useRef({} as HTMLInputElement);
  const resultList = useRef({} as HTMLDivElement);

  let { data: searchedCityData } = useGetCity(searchedCity, setCityResult);

  // Add city to the list.
  const addCity = (newCity: CityList) => {
    if (newCity) {
      if (cities?.length && !cities?.includes(newCity)) {
        setCities([...cities, newCity]);
      } else if (!cities?.length) {
        setCities([newCity]);
      }
      return true;
    } else {
      return false;
    }
  };

  // Add city from the search result
  const addCitySearchResult = (e: React.MouseEvent<HTMLElement>) => {
    let target = e.target as HTMLButtonElement;
    let test = target?.dataset?.info !== undefined ? target.dataset.info : {};
    // console.log(JSON.parse(decodeURIComponent(test.toString())));
    let data = JSON.parse(decodeURIComponent(test.toString()));
    addCity(data);
    setCityResult([])
  };

  // When form submits
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (addCity(cityName.current.value)) cityName.current.value = "";
  };

  return (
    <div className='search'>
      <form onSubmit={submitForm}>
        <input type='text' ref={searchedCity} placeholder='City Name' name='city' onChange={() => searchedCityData.refetch()} />
        <input type='submit' value='Add' />
      </form>
      <div className='result' ref={resultList}>
        {cityResult
          ? cityResult.map((res: CityData) => {
              let dataInfo = encodeURIComponent(
                JSON.stringify({
                  id: res["id"],
                  name: res["name"],
                  latitude: res["latitude"],
                  longitude: res["longitude"],
                })
              );
              return (
                <p onClick={addCitySearchResult} data-info={dataInfo} key={res["id"]}>
                  {res["name"]}, {res["state"]}, {res["country"]}
                </p>
              );
            })
          : ""}
      </div>
    </div>
  );
};
