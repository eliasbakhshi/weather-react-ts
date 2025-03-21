export type SetAction<T> = React.Dispatch<React.SetStateAction<T>>;

export type StorageType<T> = [T | [], React.Dispatch<React.SetStateAction<T | []>>];

export type ContextValues<> = {
  cityResult: CityData[];
  setCityResult: SetAction<CityData[]>;
  cities: (null | WeatherInfo)[];
  setCities: SetAction<(null | WeatherInfo)[]>;
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

export type CityList = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

export type WeatherInfo = CityList & {
  timezone?: string;
  hourly?: {
    units: string;
    temperature_2m: number[];
    time: string[];
  };
  daily?: {
    units: string;
    temperature_2m: number[];
    time?: string[];
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

