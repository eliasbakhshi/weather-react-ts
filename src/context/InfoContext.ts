import { createContext } from "react";
import { ContextValues, APIData, WeatherInfo } from "../components/Types";

export const InfoContext = createContext({} as ContextValues<APIData, (null | WeatherInfo)[]>);
