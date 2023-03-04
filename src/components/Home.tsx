import { Info } from "../components/Types"
import data from "../data/req.json"
import { Card } from "./Card"
import { useExtractInfo } from "../hooks/useExtractInfo"
import { useUpdateInfo } from "../hooks/useUpdateInfo"

export const Home = () => {
  let info: Info = useExtractInfo(data);
  let info2  = useUpdateInfo(info);
  console.log("info", info2);

  return <Card data={data}></Card>
}
