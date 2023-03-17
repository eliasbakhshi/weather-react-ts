import { useState } from "react";
import { Home } from "./components/Home";
import { APIData, UpdatedInfo } from "./components/Types";
import "./App.css";
import { InfoContext } from "./context/InfoContext";
import "./styles/main.scss"
function App() {
  const [data, setData] = useState<APIData | null>(null);
  const [info, setInfo] = useState<UpdatedInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let value = { data, setData, info, setInfo, loading, setLoading, error, setError };

  return (
    <InfoContext.Provider value={value}>
      <div className='App'>
        <p>test 2</p>
        <Home></Home>
      </div>
    </InfoContext.Provider>
  );
}

export default App;
