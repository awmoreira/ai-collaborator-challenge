import "./App.css";
import { format } from "date-fns";
import { useLocation } from "./hooks/useLocation";
import { useGetWeather } from "./hooks/useGetWheather";
import Loading from "./components/Loading";
import Error from "./components/Error";
import Home from "./pages/Home";
import { useEffect, useState } from "react";

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

  if (isError || data === undefined || data === null) {
    return <Error message={error?.message} />;
  }

  const dayWeek = format(new Date(data?.dt * 1000), "EEEE");

  return (
    <div className="container">
      <Home
        data={data}
        dayWeek={dayWeek}
        setCity={setCity}
        unit={unit}
        setUnit={setUnit}
      />
    </div>
  );
}

export default App;
