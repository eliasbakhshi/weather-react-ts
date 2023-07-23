import { useContext } from "react";
import { InfoContext } from "../context/InfoContext";
import { WeatherInfo, ContextValues } from "../components/Types";
import deleteIcon from "../img/delete.svg"

// TODO: - Delete option can be added to the card
export const Card = <T extends WeatherInfo>({ data }: { data: T }) => {
  let { setInfo, setCities }: ContextValues = useContext(InfoContext);

  const removeCity = (e: React.MouseEvent<HTMLParagraphElement>) => {
    let target = e.target as HTMLParagraphElement;

    // Remove the city from the local storage list
    setCities((preCities) => {
      return preCities.filter((city) => city.id !== Number(target.id));
    });
    // Remove the city from the view list
    setInfo((preInfo) => {
      return preInfo.filter((info) => info?.id !== Number(target.id));
    });
  };
  return (
    <article className='card'>
      <img src={deleteIcon} alt="Delete city" onClick={removeCity} id={data.id.toString()} />
      {data.name && (
        <p className='temperature'>
          {Math.floor(data.daily.temperature_2m[0][0]).toString()} {data.daily.units}
        </p>
      )}
      {data.name && <p className='city-name'>{data.name}</p>}
    </article>
  );
};
