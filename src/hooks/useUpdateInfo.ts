import { Info, UpdatedInfo } from "../components/Types";
import { useSetDay } from "../hooks/useSetDay";

export const useUpdateInfo = (info: Info) => {
  let updatingData: UpdatedInfo = useSetDay(info);
  const median = (arr: number[]): number | undefined => {
    if (!arr.length) return undefined;
    const s = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(s.length / 2);
    return s.length % 2 === 0 ? (s[mid - 1] + s[mid]) / 2 : s[mid];
  };

  let updatedData = updatingData.map((day) => {
    let maxTempDay = Math.max(...day.items.map((o) => o.max));
    let theMedianTempDay = Math.min(...day.items.map((o) => o.min));
    const { length } = day.items;
    let averageTempDay = day.items.reduce((acc, val) => {
      return acc + val.temp / length;
    }, 0);
    let medianTempDay = median([...day.items.map((o) => o.temp)]);

    return { maxTempDay, theMedianTempDay, averageTempDay, medianTempDay, ...day };
  });

  return updatedData;
};
