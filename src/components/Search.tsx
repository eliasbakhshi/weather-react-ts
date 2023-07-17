import { useContext, useRef, useEffect } from "react";
import { ContextValues, APIData, WeatherInfo, CityData, CityList } from "../components/Types";
import { InfoContext } from "../context/InfoContext";
import { useGetCity } from "../hooks/useGetCity";

export const Search = () => {
  let { data, setData, info, setInfo, cities, setCities, cityResult, setCityResult, loading, setLoading, error, setError }: ContextValues<APIData, (null | WeatherInfo)[] | null> = useContext(InfoContext);

  const cityName = useRef({} as HTMLInputElement);

  let { status: statusResult, data: searchResult } = useGetCity("karlstad");

  // Add city to the list.
  const addCity = (newCity: CityList) => {
    console.log("newCity", newCity);
    console.log("wwww");


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

  console.log("cities", cities);

  // Add city from the search result
  const addCitySearchResult = (e: React.MouseEvent<HTMLElement>) => {
    let target = e.target as HTMLButtonElement;
    let test = target?.dataset?.info !== undefined ? target.dataset.info : {};
    console.log(JSON.parse(decodeURIComponent(test.toString())));
    let data = JSON.parse(decodeURIComponent(test.toString()))
    addCity(data)
  };

  // When form submits
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (addCity(cityName.current.value)) cityName.current.value = "";
  };

  useEffect(() => {
    // Update the search result
    if (statusResult === "success") {
      setCityResult(searchResult);
      // setCityResult([]);
    }
  }, [statusResult]);

  return (
    <div className='search'>
      <form onSubmit={submitForm}>
        <input type='text' ref={cityName} placeholder='City Name' name='city' />
        <input type='submit' value='Add' />
      </form>
      <div className='result'>
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
                <p onClick={addCitySearchResult} data-info={dataInfo} key={res['id']}>
                  {res["name"]} , {res["state"]}
                </p>
              );
            })
          : ""}
      </div>
    </div>
  );
};
