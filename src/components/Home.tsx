import { useContext } from "react";
import { Card } from "./Card";
import { InfoContext } from "../context/InfoContext";
import { ContextValues } from "../components/Types";
import { useGetWeather } from "../hooks/useGetWeather";
import { Search } from "./Search";

export const Home = () => {
  let { info }: ContextValues = useContext(InfoContext);
  useGetWeather();

  return (
    <main className='container home'>
      <div className='header'>
        <Search />
      </div>
      <div className='cities'>
        {info?.map((item) => {
          return item?.id ? <Card data={item} key={item.id.toString()} /> : "";
        })}
      </div>
    </main>
  );
};
