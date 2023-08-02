import { useContext } from "react";
import { InfoContext } from "../context/InfoContext";
import { WeatherInfo, ContextValues } from "./Types";
import deleteIcon from "../img/delete.svg";
import detailsIcon from "../img/details.svg";
import { Link } from "react-router-dom";

// TODO: - Delete option can be added to the card
export const City = <T extends WeatherInfo>({ data }: { data: T }) => {
  let { setCities }: ContextValues = useContext(InfoContext);

  const removeCity = (e: React.MouseEvent<HTMLParagraphElement>) => {
    let target = e.target as HTMLParagraphElement;

    // Remove the city from the local storage list
    setCities((preCities) => {
      return preCities.filter((city) => city?.id !== Number(target.id));
    });
  };
  return (
    <article className='c-city'>
      <img src={deleteIcon} className='delete' alt='Delete city' onClick={removeCity} id={data.id.toString()} />
      <Link to={`details/${data.id}`}>
        <img src={detailsIcon} className='details' alt={`Details of ${data.name}`} />
      </Link>
      {data.name && (
        <p className='temperature'>
          {Math.floor(Number(data.daily?.temperature_2m[0])).toString()} {data.daily?.units}
        </p>
      )}
      {data.name && <p className='city-name'>{data.name}</p>}
    </article>
  );
};
