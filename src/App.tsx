import { useState } from "react";
import { Home } from "./components/Home";
import { APIData, WeatherInfo, CitiesName } from "./components/Types";
import { InfoContext } from "./context/InfoContext";
import "./styles/main.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useLocalStorage } from "./hooks/useLocalStorage";


const queryClient = new QueryClient();

function App() {
  const [data, setData] = useState<APIData | null | any>(null);
  const [info, setInfo] = useState<(null | WeatherInfo)[] | null>(null);
  // const [cities, setCities] = useState<CitiesName[]>([]);
  const [cities, setCities] = useLocalStorage<string[]>("cities", []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let value = { cities, setCities, data, setData, info, setInfo, loading, setLoading, error, setError };

  return (
    <QueryClientProvider client={queryClient}>
      <InfoContext.Provider value={value}>
        <div className='App'>
          <Home></Home>
        </div>
      </InfoContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;
