import { useEffect } from "react";
import { GetList, APIData } from "../components/Types";
import axios from "axios";

export const useFetch = <T extends GetList<APIData>>({ setData, setLoading, setError }: T): void => {
  useEffect(() => {
    setLoading(true);
    // setData(null);
    setError("");
    axios
      .get(String(process.env.REACT_APP_API_KEY))
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong.");
      });
  }, []);
};

