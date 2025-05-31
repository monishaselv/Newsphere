import { Linking, PermissionsAndroid, Platform } from "react-native";
import { getNewsApi, getWeatherApi, getWeatherForecastApi } from "../service/remote/api/Api";
import Geolocation from 'react-native-geolocation-service';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setForecastData, setLoading, setLocation, setNewsArticles, setWeatherData } from "../redux/slice/dashboardSlice";

const DashboardViewModel = () => {
    const dispatch = useDispatch();
    const requestLocation = async () => {
        const hasPermission = await getLocationPermission();
        if (!hasPermission) return;

        Geolocation.getCurrentPosition(
            async (position) => {
                console.log('Latitude:', position.coords.latitude);
                console.log('Longitude:', position.coords.longitude);
                await getCurrentWeather(position.coords.latitude, position.coords.longitude);
                await getWeatherForecast(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.warn(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const getLocationPermission = async () => {
        if (Platform.OS === 'ios') return true;

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    };
    const getCurrentWeather = async (lat: any, long: any) => {
        try {
            const response = await getWeatherApi(lat, long);
            console.log("response is here:", response);
            if (response.status === 200) {
                dispatch(setLocation(response.data.name));
                const data = response.data;
                const payload = {
                    location: data.name,
                    temperature: data.main.temp,
                    condition: data.weather[0].main,
                    description: data.weather[0].description,
                    humidity: data.main.humidity,
                    minTemp: data.main.temp_min,
                    maxTemp: data.main.temp_max,
                    icon: data.weather[0].icon,
                    timestamp: data.dt,
                };
                dispatch(setWeatherData(payload));
            } else {
                console.log("❌ Error - status not 200", response.status);
            }
        } catch (eror: any) {
            console.log("❌ Fetch failed", eror.message);
        }
    };
    const getWeatherForecast = async (lat: any, long: any) => {
        try {
            const response = await getWeatherForecastApi(lat, long);
            console.log("foreacts is here:", response);
            if (response.status === 200) {
                console.log("222222🦁success:", response);
                const forecastList = response.data.list.slice(0, 5);
                const payload = forecastList.map((item: any) => ({
                    date: item.dt_txt,
                    temperature: item.main.temp,
                    condition: item.weather[0].main,
                    icon: item.weather[0].icon
                }));
                dispatch(setForecastData(payload));
            } else {
                console.log("❌ Error - status not 200", response.status);
            }
        } catch (eror: any) {
            console.log("❌ Fetch failed", eror.message);
        }
    };
    const defaultColor = '#4a90e2';
    const backgroundColors: Record<string, string> = {
        Clear: '#f7b733',      // sunny orange/yellow
        Clouds: '#757f9a',     // grayish blue
        Rain: '#00d2ff',       // bright blue
        Drizzle: '#76c7c0',    // light blue-green
        Thunderstorm: '#373b44', // dark gray
        Snow: '#a1c4fd',       // light icy blue
        Mist: '#606c88',
        Smoke: '#606c88',
        Haze: '#a1a1a1',
        Dust: '#b79891',
        Fog: '#606c88',
        Sand: '#c2b280',
        Ash: '#666666',
        Squall: '#1f1c2c',
        Tornado: '#2c3e50',
    };
    const formattedDate = new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });
    const timeAgo = (publishedAt: string) => {
        const publishedDate = new Date(publishedAt);
        const now = new Date();
        const diffMs = now.getTime() - publishedDate.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 60) return `${diffMins} min ago`;
        const diffHours = Math.floor(diffMins / 60);
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    };
    const fetchNews = async (temp: any) => {
        const keyword = filterNews(temp);
        dispatch(setLoading(true));
        try {
            const response = await getNewsApi(keyword);
            console.log("news updated success:", response);
            if (response.status === 200) {
                console.log(" News fetch sucess", response.data);
                dispatch(setNewsArticles(response.data.articles));
            }
        } catch (error) {
            console.log(" News fetch failed", error);
        } finally {
            dispatch(setLoading(false));
        }
    }
    const filterNews = (temp: number) => {
        if (temp < 15) return 'depression';
        if (temp > 30) return 'fear';
        return 'happiness';
    };

    const openNewsLink = (url: string) => {
        if (url) {
            Linking.openURL(url);
        }
    };

    return { getCurrentWeather, requestLocation, formattedDate, fetchNews, timeAgo, filterNews, openNewsLink, backgroundColors, defaultColor, getWeatherForecast }
}
export default DashboardViewModel