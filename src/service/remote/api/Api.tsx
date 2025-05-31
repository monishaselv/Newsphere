
import { BASE_NEWS_URL, BASE_WEATHER_URL } from "../utils/Constants";
import { get } from "../utils/Index";

export const getWeatherApi = (lat: any, long: any) => {
    return get(
        `weather?lat=${lat}&lon=${long}&appid=03d25e452ff24f1cfb3a778f0d2afb8c&units=metric`, "", BASE_WEATHER_URL
    );
};
export const getWeatherForecastApi = (lat: any, lon: any) => {
    return get(
        `forecast?lat=${lat}&lon=${lon}&appid=03d25e452ff24f1cfb3a778f0d2afb8c&units=metric`, "", BASE_WEATHER_URL
    );
};
export const getNewsApi = (filter: String) => {
    return get(
        `everything?q=${filter}&language=en&sortBy=publishedAt&apiKey=67badab61a9644f1afa42c54565026f7`, "", BASE_NEWS_URL
    );
};