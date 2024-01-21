import "./styles.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { format as formatTz } from "date-fns-tz";
import { WeatherCondition, weatherConditions } from "../../utils/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTemperatureArrowDown,
  faTemperatureArrowUp,
  faDroplet,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import Switch from "../../components/SwitchUnit";
import SearchInput from "../../components/Input";

interface IHome {
  data: IWeatherResponse;
  dayWeek: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  unit: string;
  setUnit: React.Dispatch<React.SetStateAction<string>>;
}

function Home({ data, dayWeek, setCity, unit, setUnit }: IHome) {
  const handleSearch = (query: string) => {
    if (query.length > 2) {
      setCity(query);
    }
  };

  const handleToggle = (isCelsius: boolean) => {
    setUnit(isCelsius ? "metric" : "imperial");
  };

  const condition: string = data?.weather[0]?.main ?? "default";
  const icon: IconDefinition = weatherConditions[condition as WeatherCondition];

  return (
    <div className="container">
      <div className="top">
        <SearchInput onSearch={handleSearch} />
        <span>{data?.name}</span>
        <span>
          {data?.sys?.country === "BR" ? "Brasil" : data?.sys?.country}
        </span>
        <Switch onToggle={handleToggle} unit={unit} />
      </div>
      <div className="middle">
        <span>{`${data?.main?.temp.toFixed(0)}°${
          unit === "metric" ? "C" : "F"
        }`}</span>
        <FontAwesomeIcon icon={icon} size="7x" color="#000000" />
        <span>{`${data?.weather[0].main} - ${data?.weather[0].description}`}</span>
        <div className="humidity">
          <FontAwesomeIcon
            style={{ height: 25 }}
            icon={faDroplet}
            size="sm"
            color="#000"
          />
          <span>{data?.main.humidity}%</span>
        </div>
        <div className="wind">
          <FontAwesomeIcon
            style={{ height: 25 }}
            icon={faWind}
            size="sm"
            color="#000"
          />
          <span>{data?.wind.speed} mph</span>
        </div>
        <span>{dayWeek?.charAt(0).toUpperCase() + dayWeek?.slice(1)}</span>
        <span>{formatTz(new Date(data?.dt * 1000), "MM/dd/yyyy")}</span>
      </div>
      <div className="bottom">
        <div className="wrapper-tags">
          <div className="tag">
            <FontAwesomeIcon
              icon={faTemperatureArrowDown}
              size="lg"
              color="#000"
            />
            <span>Min</span>
            <div className="divider" />
            <span>{`${data?.main?.temp_min.toFixed(0)}°`}</span>
          </div>
          <div className="tag">
            <FontAwesomeIcon
              icon={faTemperatureArrowUp}
              size="lg"
              color="#000"
            />
            <span>Max</span>
            <div className="divider" />
            <span>{`${data?.main?.temp_max.toFixed(0)}°`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
