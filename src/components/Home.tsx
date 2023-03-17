import { Info } from "../components/Types";
import { useContext } from "react";
import data2 from "../data/data.json";
import { Card } from "./Card";
import { useExtractInfo } from "../hooks/useExtractInfo";
import { useUpdateInfo } from "../hooks/useUpdateInfo";
import { InfoContext } from "../context/InfoContext";
import { useFetch } from "../hooks/useFetch";
import { ContextValues, APIData, UpdatedInfo } from "../components/Types";

export const Home = () => {
  let { data, setData, info, setInfo, loading, setLoading, error, setError }: ContextValues<APIData, UpdatedInfo> = useContext(InfoContext);
  setData(data2.data[0])

  // useFetch({ setData, setLoading, setError });

  let info2: Info | null = useExtractInfo(data);
  let info3 = useUpdateInfo(info2);
  console.log("info", info3);

  return (
    <main className="container home">
      {
        info3?.map(item => {
          return <Card data={item} key={item.daysLater}></Card>
        })
      }
    </main>
  )


  ;
};
