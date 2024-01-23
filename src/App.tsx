import "./App.css";

import { useLocation } from "./hooks/useLocation";
import { useGetWeather } from "./hooks/useGetWheather";
import Loading from "./components/Loading";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import Footer from './assets/footer.png'

function App() {
  const location = useLocation();
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("metric");

  const { data, isLoading, isError, error, refetch } = useGetWeather({
    coords: location,
    city,
    unit,
  });

  useEffect(() => {
    refetch();
  }, [city, unit, location, refetch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <Home
        data={data}        
        setCity={setCity}
        unit={unit}
        setUnit={setUnit}
        error={{
          isError,
          errorMessage: location?.error ?? error?.message
        }}
      />
      <img className="footer-image" src={Footer} alt="" />
    </div>
  );
}

export default App;
