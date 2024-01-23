import "./styles.css";
import { IconDefinition, icon } from "@fortawesome/fontawesome-svg-core";
import { format as formatTz } from "date-fns-tz";
import { format } from "date-fns";
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
import Error from "../../components/Error";

interface IHome {
  data: IWeatherResponse | null | undefined;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  unit: string;
  setUnit: React.Dispatch<React.SetStateAction<string>>;
  error: { isError: boolean; errorMessage: string | undefined };
}

function Home({ data, setCity, unit, setUnit, error }: IHome) {
  console.log("🚀 ~ Home ~ error:", error);
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
  const dayWeek = data?.dt
    ? format(new Date(Number(data?.dt) * 1000), "EEEE")
    : "Not defined";

  return (
    <>
      <div className="top">
        <SearchInput onSearch={handleSearch} />
        {!!data && (
          <>
            <span>{data?.name}</span>
            <span>
              {data?.sys?.country === "BR" ? "Brasil" : data?.sys?.country}
            </span>
            <Switch onToggle={handleToggle} unit={unit} />
          </>
        )}
      </div>
      {!!data && (
        <>
          <div className="middle">
            <span>{`${data?.main?.temp.toFixed(0)}°${
              unit === "metric" ? "C" : "F"
            }`}</span>
            <FontAwesomeIcon icon={icon} size="6x" color="#000000" />
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
            <span>
              {formatTz(new Date(Number(data?.dt) * 1000), "MM/dd/yyyy")}
            </span>
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
        </>
      )}
      {error?.isError && <Error message={error.errorMessage} />}
    </>
  );
}

export default Home;
