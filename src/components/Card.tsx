import { CardInfo } from "./Types";

export const Card = <T extends CardInfo>({ data }: { data: T | null }) => {
  console.log("data", data);

  return (
    <article className='card'>
      {data?.maxTempDay && <p>maxTempDay: {data?.maxTempDay}</p> }
      {data?.minTempDay && <p>minTempDay: {data?.minTempDay}</p> }
      {data?.averageTempDay && <p>averageTempDay: {data?.averageTempDay}</p> }
      {data?.medianTempDay && <p>medianTempDay: {data?.medianTempDay}</p> }
    </article>
  );
};
