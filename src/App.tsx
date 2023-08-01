import { useState } from "react";
import { Home } from "./components/Home";
import { WeatherInfo, CityData } from "./components/Types";
import { InfoContext } from "./context/InfoContext";
import "./styles/main.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Routes, Route } from "react-router-dom";
import { CityDetails } from "./components/CityDetails";
import { Error404 } from "./components/Error404";

const queryClient = new QueryClient();

function App() {
  console.log("--------------------------------------------------");
  const [cities, setCities] = useLocalStorage<(null | WeatherInfo)[]>("cities", []);
  const [cityResult, setCityResult] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let value = { cities, setCities, cityResult, setCityResult, loading, setLoading, error, setError };

  return (
    <QueryClientProvider client={queryClient}>
      <InfoContext.Provider value={value}>
        <div className='App'>
          <div id='overlay'></div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='details/:id' element={<CityDetails />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
        </div>
      </InfoContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;
