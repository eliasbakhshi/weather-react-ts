import { useContext, useRef, useEffect } from "react";
import { ContextValues, CityData, CityList } from "../components/Types";
import { InfoContext } from "../context/InfoContext";
import { useGetCity } from "../hooks/useGetCity";
import searchIcon from "../img/search.svg";

// TODO: Press esc should exit user from overlay and search area.

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
    }
  };

  // Add city from the search result.
  const addCitySearchResult = () => {
    let selectedRes = resultList.current.querySelector(".selected") as HTMLLIElement;
    let tempData = selectedRes?.dataset?.info !== undefined ? selectedRes.dataset.info : {};
    let data = JSON.parse(decodeURIComponent(tempData.toString()));
    addCity(data);
    setCityResult([]);
    overlay?.classList.remove("show");
    searchedCity.current.value = "";
  };

  // When form submits.
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCitySearchResult();
  };

  // Hide the overlay when user clicks outside of the search bar.
  const hideOverlay = (e: Event) => {
    let target = e.target as HTMLLIElement;
    target?.classList.remove("show");
    overlay?.removeEventListener("click", hideOverlay);
    setCityResult([]);
    searchedCity.current.value = "";
    document.querySelector(".c-search")?.classList.remove("focus");
  };
  // Add navigation throw search result by arrow up and down.
  const upOrDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      // Prevent from going to the beginning/end of the text.
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

  // Active search bar.
  const activeSearch = (e: React.MouseEvent<HTMLFormElement>) => {
    document.querySelector(".c-search")?.classList.add("focus");
    overlay?.classList.add("show");
    overlay?.addEventListener("click", hideOverlay);
  };

  // Change the selected result when mouse is hovered on it.
  const selectResultOnHover = (e: React.MouseEvent<HTMLUListElement, MouseEvent>): void => {
    if (resultList.current.hasChildNodes()) {
      resultList.current.querySelectorAll("li").forEach((li) => {
        li.classList.remove("selected");
      });
      let target = e.target as HTMLLIElement;
      target.classList.add("selected");
    }
  };

  return (
    <div className={cityResult?.length ? "c-search have-result" : "c-search"}>
      <form onSubmit={submitForm} onClick={activeSearch}>
        <input type='text' ref={searchedCity} placeholder='City Name' name='city' autoComplete='off' onChange={() => searchedCityData.refetch()} onKeyDown={upOrDown} />
        <img src={searchIcon} onClick={() => searchedCityData.refetch()} alt='search city' />
      </form>
      <ul className={cityResult?.length ? "result have-result" : "result"} ref={resultList} onMouseOver={selectResultOnHover}>
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
                <li onClick={addCitySearchResult} data-name={res["name"]} data-info={dataInfo} key={res["id"]}>
                  {res["name"]}, {res["state"]}, {res["country"]}
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
};
