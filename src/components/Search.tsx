import { useContext, useRef, useEffect } from "react";
import { ContextValues, CityData, CityList } from "../components/Types";
import { InfoContext } from "../context/InfoContext";
import { useGetCity } from "../hooks/useGetCity";
import searchIcon from "../img/search.svg";

export const Search = () => {
  let { cities, setCities, cityResult, setCityResult }: ContextValues = useContext(InfoContext);
  const searchedCity = useRef({} as HTMLInputElement);
  const resultList = useRef({} as HTMLUListElement);
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
  const addCitySearchResult = (e: React.MouseEvent<HTMLLIElement>) => {
    let target = e.target as HTMLLIElement;
    let tempData = target?.dataset?.info !== undefined ? target.dataset.info : {};
    let data = JSON.parse(decodeURIComponent(tempData.toString()));
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
    let target = e.target as HTMLLIElement;
    target?.classList.remove("show");
    overlay?.removeEventListener("click", hideOverlay);
    setCityResult([]);
    searchedCity.current.value = "";
  };
  // Add navigation throw search result by arrow up and down
  const upOrDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      // Prevent from going to the beginning/end of the text
      e.preventDefault();
    }
    let selectedResult = resultList.current.querySelector("li.selected");

    if (!selectedResult && e.key === "ArrowDown" && resultList.current.hasChildNodes()) {
      // Add .selected to the first result to begin with when user clicks down
      resultList.current.firstElementChild?.classList.add("selected");
    } else if (e.key === "ArrowDown" && selectedResult?.nextSibling) {
      // When arrow down is pressed.
      selectedResult?.classList.remove("selected");
      selectedResult?.nextElementSibling?.classList.add("selected");
    } else if (e.key === "ArrowUp" && selectedResult?.previousSibling) {
      // When arrow down is pressed.
      selectedResult?.classList.remove("selected");
      selectedResult?.previousElementSibling?.classList.add("selected");
    }
  };

  // Active search bar
  const activeSearch = (e: React.MouseEvent<HTMLFormElement>) => {
    overlay?.classList.add("show");
    overlay?.addEventListener("click", hideOverlay);
  };

  useEffect(() => {
    searchedCity.current?.addEventListener("keydown", upOrDown);
    return () => searchedCity.current?.removeEventListener("keydown", upOrDown);
  }, []);
  
  return (
    <div className='c-search'>
      <form onSubmit={submitForm} onClick={activeSearch}>
        <input type='text' ref={searchedCity} placeholder='City Name' name='city' autoComplete='off' onChange={() => searchedCityData.refetch()} />
        <img src={searchIcon} onClick={() => searchedCityData.refetch()} alt='search city' />
      </form>
      <ul className='result' ref={resultList}>
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
                <li onClick={addCitySearchResult} data-info={dataInfo} key={res["id"]}>
                  {res["name"]}, {res["state"]}, {res["country"]}
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
};
