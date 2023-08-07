import { useContext } from "react";
import { City } from "./City";
import { InfoContext } from "../context/InfoContext";
import { ContextValues } from "../components/Types";
import { useGetWeather } from "../hooks/useGetWeather";
import { Search } from "./Search";

export const Home = () => {
  let { cities }: ContextValues = useContext(InfoContext);
  useGetWeather();

  return (
    <main className='container c-home'>
      <section className='header'>
        <Search />
      </section>
      <section className='cities'>
        {cities?.map((item) => {
          return item?.daily ? <City data={item} key={item.id.toString()} /> : "";
        })}
      </section>
    </main>
  );
};
