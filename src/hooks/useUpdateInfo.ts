import { Info, UpdatedInfo } from "../components/Types";
import { useSetDay } from "../hooks/useSetDay";

export const useUpdateInfo = (info: Info | null): UpdatedInfo | null => {
  let updatingData: UpdatedInfo | null = useSetDay(info);
  if (info && updatingData) {
    const median = (arr: number[]): number => {
      if (!arr.length) return 0;
      const s = [...arr].sort((a, b) => a - b);
      const mid = Math.floor(s.length / 2);
      return Math.round(s.length % 2 === 0 ? (s[mid - 1] + s[mid]) / 2 : s[mid]);
    };

    let updatedData = updatingData.map((day) => {
      let maxTempDay = Math.round(Math.max(...day.items.map((o) => o.max)));
      let minTempDay = Math.round(Math.min(...day.items.map((o) => o.min)));
      const { length } = day.items;
      let averageTempDay = Math.round(day.items.reduce((acc, val) => {
        return acc + val.temp / length;
      }, 0));
      let medianTempDay = median([...day.items.map((o) => o.temp)]);

      return { maxTempDay, minTempDay, averageTempDay, medianTempDay, ...day };
    });

    return updatedData;
  } else {
    return null;
  }
};
