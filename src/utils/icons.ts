import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import {
  faCloudRain,
  faSun,
  faThunderstorm,
  faCloudSun,
  faSnowflake,
  faCloud,
  faCloudShowersHeavy,
  faCloudMoon,
} from "@fortawesome/free-solid-svg-icons";

export type WeatherCondition = keyof typeof weatherConditions;

export const weatherConditions = {
  Rain: faCloudShowersHeavy,
  Clear: faSun,
  Thunderstorm: faThunderstorm,
  Clouds: faCloudSun,
  Snow: faSnowflake,
  Drizzle: faCloud,
  Haze: faCloudRain,
  Mist: faCloud,
  default: faCloudMoon,
};

type WeatherConditions = { [key in WeatherCondition]: IconDefinition };

export default WeatherConditions;
