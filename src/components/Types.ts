export type SetAction<T> = React.Dispatch<React.SetStateAction<T>>;

export type StorageType<T> = [T | [], React.Dispatch<React.SetStateAction<T | []>>];

export type ContextValues<> = {
  info: (null | WeatherInfo)[];
  setInfo: SetAction<(null | WeatherInfo)[]>;
  cityResult: CityData[];
  setCityResult: SetAction<CityData[]>;
  cities: CityList[];
  setCities: SetAction<CityList[]>;
  loading: boolean;
  setLoading: SetAction<boolean>;
  error: string;
  setError: SetAction<string>;
};

export type CityCoordinate = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

export type WeatherInfo = {
  id: number;
  name: String;
  latitude: number;
  longitude: number;
  timezone: String;
  hourly: {
    units: String;
    temperature_2m: number[][];
    time: String[];
  };
  daily: {
    units: String;
    temperature_2m: number[][];
    time: String[];
  };
};
export type CityData = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  state: string;
  admin1?: string;
};

export type CityList = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};
