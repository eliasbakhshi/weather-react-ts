import { useParams } from "react-router-dom";
import { useContext } from "react";
import { InfoContext } from "../context/InfoContext";
import { ContextValues } from "./Types";

export const CityDetails = () => {
  const { id } = useParams();
  let { info }: ContextValues = useContext(InfoContext);

  let cityInfo = info.filter((city) => city?.id === Number(id));

  console.log(cityInfo);

  return <div>Details with id: {id}</div>;
};
