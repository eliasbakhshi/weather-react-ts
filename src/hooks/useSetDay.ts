import { Info, UpdatedInfo } from "../components/Types";

export const useSetDay = <T extends Info>(info: T | null): UpdatedInfo | null => {
  let days: UpdatedInfo = [];

  let today = new Date();
  if (info) {
    info.forEach((hour) => {
      let time = new Date(hour.time * 1000);
      let theDay: number = 0;
      let items = [];

      // get the day of the hour
      for (let i:number = 0; i < 5; i++) {
        if (time.getDate() === today.getDate() + i) {
          theDay = i;
        }
      }

      if (days.length && days[theDay]) {
        items = [...days[theDay].items, hour];
      } else {
        items = [hour];
      }
      // Set the date
      days[theDay] = {
        daysLater: theDay,
        items: items,
      };
    });

    return days;
  } else {
    return null;
  }

};
