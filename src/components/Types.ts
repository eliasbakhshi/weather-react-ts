export type APIData = {
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: { lat: number; lon: number };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export type Info = {
  time: number;
  min: number;
  max: number;
  temp: number;
}[];

export type CardInfo = {
  maxTempDay?: number;
  minTempDay?: number;
  averageTempDay?: number;
  medianTempDay?: number;
  daysLater?: number;
  items: Info;
};

export type UpdatedInfo = CardInfo[];

export type SetAction<T> = React.Dispatch<React.SetStateAction<T>>;

export type ContextValues<T, Y> = {
  data: null | T;
  setData: SetAction<null | T>;
  info: null | Y;
  setInfo: SetAction<null | Y>;
  cities: string[];
  setCities: SetAction<string[]>;
  loading: boolean;
  setLoading: SetAction<boolean>;
  error: string;
  setError: SetAction<string>;
};

export type GetList<T> = {
  setData: SetAction<null | T>;
  setLoading: SetAction<boolean>;
  setError: SetAction<string>;
};

export type StorageType<T> = [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>];

export type CitiesName = {
  name: string;
  count?: number;
};

export type CityCoordinate = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

export type WeatherInfo = {
  id: Number;
  name: String;
  latitude: Number;
  longitude: Number;
  timezone: String;
  hourly: {
    units: String;
    temperature_2m: Number[];
    time: String[];
  };
  daily: {
    units: String;
    temperature_2m: Number[];
    time: String[];
  };
};
