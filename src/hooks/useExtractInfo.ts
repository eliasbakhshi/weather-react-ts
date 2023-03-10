import { APIData, Info } from "../components/Types"

export const useExtractInfo = <T extends APIData | null>(data: T ): Info | null => {
  if (data) {
    return data.list.map((temps) => {
      return {
        time: temps.dt,
        min: temps.main.temp_min,
        max: temps.main.temp_max,
        temp: temps.main.temp,
      };
    });
  } else {
    return null;
  }

}
