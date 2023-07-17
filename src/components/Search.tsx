import { useContext, useRef, useEffect } from "react";
import { ContextValues, APIData, WeatherInfo, CityData } from "../components/Types";
import { InfoContext } from "../context/InfoContext";
import { useGetCity } from "../hooks/useGetCity";

export const Search = () => {
  let { data, setData, info, setInfo, cities, setCities, cityResult, setCityResult, loading, setLoading, error, setError }: ContextValues<APIData, (null | WeatherInfo)[] | null> = useContext(InfoContext);

  const cityName = useRef({} as HTMLInputElement);

  let { status: statusResult, data: searchResult } = useGetCity("karlstad");

  // Add city to the list.
  const addCity = (tempCity: string) => {
    if (tempCity) {
      if (cities?.length && !cities?.includes(tempCity)) {
        setCities([...cities, tempCity]);
      } else if (!cities?.length) {
        setCities([tempCity]);
      }
      return true;
    } else {
      return false;
    }
  };
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (addCity(cityName.current.value)) cityName.current.value = "";
  };

  useEffect(() => {
    // Update the search result
    if (statusResult === "success") {
      // setCityResult(searchResult);
      setCityResult([]);
    }
  }, [statusResult]);

  console.log("cityResult", cityResult);

  return (
    <div className='search'>
      <form onSubmit={submitForm}>
        <input type='text' ref={cityName} placeholder='City Name' name='city' />
        <input type='submit' value='Add' />
      </form>
      <div className='result'>
        {cityResult
          ? cityResult.map((res: CityData) => {
              return (
                <p onClick={() => submitForm}>
                  {res["name"]} , {res["country"]}
                </p>
              );
            })
          : ""}
      </div>
    </div>
  );
};
