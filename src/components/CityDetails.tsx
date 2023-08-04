import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { InfoContext } from "../context/InfoContext";
import { ContextValues } from "./Types";
import { useGetWeather } from "../hooks/useGetWeather";

const getFullDate = (): string => {
  var today = new Date();
  var day = String(today.getDate()).padStart(2, "0");
  var month = String(today.getMonth() + 1).padStart(2, "0");
  var year = today.getFullYear();

  return String(year + "-" + month + "-" + day);
};

const isSameDay = (day1: string, day2: string) => {
  return new Date(day1).toDateString() === new Date(day2).toDateString();
};

export const CityDetails = () => {
  const { id } = useParams();
  let { cities }: ContextValues = useContext(InfoContext);
  const [selectedDay, setSelectedDay] = useState(getFullDate);
  let cityInfo = cities.filter((city) => city?.id === Number(id))[0];

  const changeDay = (e: React.MouseEvent) => {
    let target = e.target as HTMLDivElement;
    setSelectedDay(target.id);
  };

  return (
    <main className='c-city-details'>
      <article className='c-city'>
        {cityInfo?.name && (
          <p className='temperature'>
            {Math.floor(Number(cityInfo?.daily?.temperature_2m[0])).toString()} {cityInfo?.daily?.units}
          </p>
        )}
        {cityInfo?.name && <p className='city-name'>{cityInfo?.name}</p>}
      </article>
      <article className='days'>
        {cityInfo?.daily?.time?.map((date, index) => {
          return (
            <div id={date} key={index} className={isSameDay(selectedDay, date) ? "selected" : ""} onClick={changeDay}>
              {new Date(date).toLocaleString("default", { weekday: "short" })} {cityInfo?.daily?.temperature_2m[index]}
            </div>
          );
        })}
      </article>
      <article className='hours'>
        {cityInfo?.hourly?.time?.map((date, index) => {
          if (isSameDay(selectedDay, date)) {
            return (
              <div key={index}>
                {new Date(date).toLocaleString("default", { weekday: "short" })} {cityInfo?.hourly?.temperature_2m[index]}
              </div>
            );
          }
        })}
      </article>
    </main>
  );
};
