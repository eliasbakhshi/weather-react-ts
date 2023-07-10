import { useState } from "react";
import { Home } from "./components/Home";
import { APIData, WeatherInfo } from "./components/Types";
import { InfoContext } from "./context/InfoContext";
import "./styles/main.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();

function App() {
  const [data, setData] = useState<APIData | null | any>(null);
  const [info, setInfo] = useState<WeatherInfo[] | null>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let value = { data, setData, info, setInfo, cities, setCities, loading, setLoading, error, setError };

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
