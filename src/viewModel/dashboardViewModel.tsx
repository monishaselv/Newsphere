import { Linking, PermissionsAndroid, Platform } from "react-native";
import { getNewsApi, getWeatherApi, getWeatherForecastApi } from "../service/remote/api/Api";
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from "react-redux";
import { setForecastData, setLoading, setLocation, setNewsArticles, setWeatherData } from "../redux/slice/dashboardSlice";
import { RootState } from "../redux/store";

const DashboardViewModel = () => {
    const dispatch = useDispatch();
    const unit = useSelector((state: RootState) => state.dashboard.unit);
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
    const getWeekday = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'long' }); // "Monday", "Tuesday"
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
                    windSpeed: data.wind?.speed ?? 0,
                    rainChance: data.rain?.["1h"] ?? data.main.feels_like ?? 0,
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
            if (response.status === 200) {
                const rawList = response.data.list;

                // Keep track of one forecast per unique day
                const dailyForecast: any[] = [];
                const seenDates = new Set();

                for (const item of rawList) {
                    const dateOnly = item.dt_txt.split(" ")[0]; // e.g., "2025-06-01"

                    if (!seenDates.has(dateOnly)) {
                        seenDates.add(dateOnly);

                        dailyForecast.push({
                            date: item.dt_txt,
                            temperature: item.main.temp,
                            condition: item.weather[0].main,
                            icon: item.weather[0].icon,
                            humidity: item.main.humidity,
                        });
                    }

                    if (dailyForecast.length === 5) break; // Done collecting 5 days
                }

                dispatch(setForecastData(dailyForecast));
            } else {
                console.log("❌ Error - status not 200", response.status);
            }
        } catch (error: any) {
            console.log("❌ Forecast fetch failed", error.message);
        }
    };
    const convertTemp = (tempC: number) => {
        return unit === 'Fahrenheit' ? (tempC * 9) / 5 + 32 : tempC;
    };
    const unitSymbol = unit === 'Fahrenheit' ? '°F' : '°C';
    const defaultColor = '#EDFBFF';
    const getWeatherColor = (condition: string): string => {
        const clear = ['Clear', 'Dust', 'Sand']
        const mild = ['Clouds', 'Drizzle', 'Mist', 'Smoke', 'Haze'];
        const dark = ['Rain', 'Thunderstorm', 'Snow', 'Fog', 'Ash', 'Squall', 'Tornado'];
        if (clear.includes(condition)) return '#f7b73380';
        if (mild.includes(condition)) return '#00d2ff60';
        if (dark.includes(condition)) return '#2D74A670';

        return '#00d2ff60';
    };
    const getWeatherBox = (condition: string): string => {
        const mild = ['Clear', 'Clouds', 'Drizzle', 'Mist', 'Smoke', 'Haze', 'Dust', 'Sand'];
        const dark = ['Rain', 'Thunderstorm', 'Snow', 'Fog', 'Ash', 'Squall', 'Tornado'];

        if (mild.includes(condition)) return '#4a90e270';
        if (dark.includes(condition)) return '#616161';

        return '#cccccc';
    };
    const defaultIcon = require('../assets/images/sunny.png');
    const weatherIcons: Record<string, string> = {
        Clear: require('../assets/images/sunny.png'),
        Clouds: require('../assets/images/cloudy.png'),
        Rain: require('../assets/images/rain.png'),
        Drizzle: require('../assets/images/drizzle.png'),
        Thunderstorm: require('../assets/images/thunderstorm.png'),
        Snow: require('../assets/images/snow.png'),
        Mist: require('../assets/images/mist.png'),
        Smoke: require('../assets/images/haze.png'),
        Haze: require('../assets/images/haze.png'),
        Dust: require('../assets/images/cloudy.png'),
        Fog: require('../assets/images/haze.png'),
        Sand: require('../assets/images/mist.png'),
        Ash: require('../assets/images/mist.png'),
        Squall: require('../assets/images/mist.png'),
        Tornado: require('../assets/images/tornado.png'),
    };
    const formattedDate = new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });
    const formatDay = (dateString: string) => {
        const date = new Date(dateString);
        const month = date.toLocaleString("en-US", { month: "long" });
        const day = date.getDate();
        return `${month}, ${day}`;
    };
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

    return {
        getCurrentWeather, requestLocation, formattedDate, fetchNews, timeAgo, filterNews, openNewsLink, getWeekday, formatDay,
        defaultColor, getWeatherForecast, weatherIcons, defaultIcon, getWeatherColor, getWeatherBox, convertTemp, unitSymbol
    }
}
export default DashboardViewModel