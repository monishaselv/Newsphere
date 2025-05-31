import { createSlice } from "@reduxjs/toolkit";
import { forecastData, newsData, weatherData } from "../../service/remote/model/DashboardModel";

interface dashboardState {
    loading: boolean;
    location: String;
    weather: weatherData | null;
    articles: newsData[];
    forecast: forecastData[];
}

const initialState: dashboardState = {
    loading: false,
    location: '',
    weather: null,
    articles: [],
    forecast: [],
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setLoading: (state, actions) => {
            state.loading = actions.payload
        },
        setLocation: (state, actions) => {
            state.location = actions.payload
        },
        setWeatherData: (state, action) => {
            state.weather = action.payload;
        },
        setNewsArticles: (state, action) => {
            state.articles = action.payload;
        },
        setForecastData: (state, action) => {
            state.forecast = action.payload;
        },
    }
});
export const { setLoading, setLocation, setWeatherData, setNewsArticles, setForecastData } = dashboardSlice.actions;
export default dashboardSlice.reducer;