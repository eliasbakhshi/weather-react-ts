import { WeatherInfo } from "./Types";

export const Card = <T extends WeatherInfo>({ data }: { data: T }) => {

  console.log("data", data.daily.temperature_2m[0][0]);

    return (
      <article className='card'>
        {data.name && <p className="temperature">{(Math.floor(data.daily.temperature_2m[0][0])).toString()} {data.daily.units}</p>}
        {data.name && <p className="city-name">{data.name}</p>}
      </article>
    );

};
