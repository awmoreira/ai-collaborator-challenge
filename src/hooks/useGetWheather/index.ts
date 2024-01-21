import { useQuery } from "react-query";
import { api } from "../../services/api";

export const FETCH_WEATHER_QUERY_KEY = "fetch-weather";

const getWeatherQuery = async (
  queryParams: IGetWeatherRequest
): Promise<IWeatherResponse | null> => {
  if (queryParams.city !== "" && queryParams.city.length > 2) {
    const { data } = await api.get(
      `weather?q=${queryParams.city}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=${queryParams.unit}`
    );
    return { ...data, filter: queryParams };
  }
  const { data } = await api.get(
    `weather?lat=${queryParams.coords.latitude}&lon=${
      queryParams.coords.longitude
    }&appid=${import.meta.env.VITE_API_KEY}&units=${queryParams.unit}`
  );
  return { ...data, filter: queryParams };
};

export function useGetWeather(queryParams: IGetWeatherRequest) {
  return useQuery<IWeatherResponse | null, CustomError>(
    [FETCH_WEATHER_QUERY_KEY, queryParams],
    () => getWeatherQuery(queryParams),
    {
      enabled:
        queryParams?.coords?.latitude !== null &&
        queryParams?.coords?.longitude !== null,
    }
  );
}
