import { createContext } from "react";
import { ContextValues, APIData, UpdatedInfo } from "../components/Types";

export const InfoContext = createContext({} as ContextValues<APIData, UpdatedInfo>);
