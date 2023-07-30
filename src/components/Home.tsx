import { useContext } from "react";
import { City } from "./City";
import { InfoContext } from "../context/InfoContext";
import { ContextValues } from "../components/Types";
import { useGetWeather } from "../hooks/useGetWeather";
import { Search } from "./Search";

export const Home = () => {
  let { citiesInfo }: ContextValues = useContext(InfoContext);
  useGetWeather();

  console.log({citiesInfo});

  return (
    <main className='container home'>
      <div className='header'>
        <Search />
      </div>
      <div className='cities'>
        {citiesInfo?.map((item) => {
          return item?.id ? <City data={item} key={item.id.toString()} /> : "";
        })}
      </div>
    </main>
  );
};
