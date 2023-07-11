import { WeatherInfo } from "./Types";

export const Card = <T extends WeatherInfo>({ data }: { data: T }) => {

    return (
      <article className='card'>
        {data.name && <p>name: {data.name}</p>}
        {data.latitude && <p>latitude: {data.latitude.toString()}</p>}
        {data.longitude && <p>longitude: {data.longitude.toString()}</p>}
        {data.timezone && <p>timezone: {data.timezone}</p>}
      </article>
    );

};
