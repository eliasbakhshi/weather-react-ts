import { useContext, useRef, useEffect } from "react";
import { ContextValues, APIData, WeatherInfo, CityResult } from "../components/Types";
import { InfoContext } from "../context/InfoContext";
import { useGetCity } from "../hooks/useGetCity";

export const Search = () => {
  let { data, setData, info, setInfo, cities, setCities, cityResult, setCityResult, loading, setLoading, error, setError }: ContextValues<APIData, (null | WeatherInfo)[] | null> = useContext(InfoContext);

  const cityName = useRef({} as HTMLInputElement);

  let { status: statusResult, data: searchResult } = useGetCity("karlstad");
  console.log("searchResult", searchResult);

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
      cityName.current.value = "";
    }
  };

  // useEffect(() => {
  //   if (statusResult === "success") {
  //     setCityResult(searchResult);
  //   }
  // }, [statusResult]);

  console.log("cityResult", cityResult);

  return (
    <div className='search'>
      <form onSubmit={addCity}>
        <input type='text' ref={cityName} placeholder='City Name' name='city' />
        <input type='submit' value='Add' />
      </form>
      <div className='result'>
        {/* {cityResult
          ? cityResult.data.map((res: CityResult) => {
              return <p>{res["name"]}</p>;
            })
          : ""} */}
      </div>
    </div>
  );
};
