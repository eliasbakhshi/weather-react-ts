import { useContext, useRef } from "react";
import { ContextValues, CityData, CityList } from "../components/Types";
import { InfoContext } from "../context/InfoContext";
import { useGetCity } from "../hooks/useGetCity";
import searchIcon from "../img/search.svg";

// TODO: - Optimize if there is any thing to show and then show something because of the render issue.

export const Search = () => {
  let { cities, setCities, cityResult, setCityResult }: ContextValues = useContext(InfoContext);
  const searchedCity = useRef({} as HTMLInputElement);
  const resultList = useRef({} as HTMLDivElement);
  const overlay = document.querySelector("#overlay");
  let { data: searchedCityData } = useGetCity(searchedCity, setCityResult);

  // Add city to the list.
  const addCity = (newCity: CityList) => {
    if (newCity.hasOwnProperty("id")) {
      if (!cities?.find((city) => city?.id === newCity.id)) {
        setCities([...cities, newCity]);
      } else {
        alert("The city already exists in the list.");
      }
      return true;
    } else {
      return false;
    }
  };

  // Add city from the search result
  const addCitySearchResult = (e: React.MouseEvent<HTMLParagraphElement>) => {
    let target = e.target as HTMLParagraphElement;
    let test = target?.dataset?.info !== undefined ? target.dataset.info : {};
    let data = JSON.parse(decodeURIComponent(test.toString()));
    addCity(data);
    setCityResult([]);
    overlay?.classList.remove("show");
    searchedCity.current.value = "";
  };

  // When form submits
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchedCity.current.value = cityResult[0].name;
    searchedCityData.refetch();
  };

  // Hide the overlay when user clicks outside of the search bar
  const hideOverlay = (e: Event) => {
    let target = e.target as HTMLParagraphElement;
    target?.classList.remove("show");
    overlay?.removeEventListener("click", hideOverlay);
    setCityResult([]);
    searchedCity.current.value = "";
  };
  // Active search bar
  const activeSearch = (e: React.MouseEvent<HTMLFormElement>) => {
    overlay?.classList.add("show");
    overlay?.addEventListener("click", hideOverlay);
  };

  return (
    <div className='c-search'>
      <form onSubmit={submitForm} onClick={activeSearch}>
        <input type='text' ref={searchedCity} placeholder='City Name' name='city' onChange={() => searchedCityData.refetch()} />
        <img src={searchIcon} onClick={() => searchedCityData.refetch()} />
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
