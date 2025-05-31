import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Dimensions, Image, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { appColors } from "../../constants/AppColors";
import { AppText, AppTextBig, AppTextMid, AppTextSmall } from "../components/AppText";
import { appStyles } from "../styles/AppStyles";
import { RootState } from "../../redux/store";
import LinearGradient from "react-native-linear-gradient";

export const WeatherDetails = () => {
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const navigation = useNavigation<any>();
    const weather = useSelector((state: RootState) => state.dashboard.weather);
    const forecast = useSelector((state: RootState) => state.dashboard.forecast);
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
    const formatDay = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long', // e.g., "Saturday"
        });
    };
    const defaultColor = '#4a90e2';
    const bgColor = backgroundColors[weather?.condition ?? ""] || defaultColor;
    const degree = Math.round(weather?.temperature ?? 0)
    return (
        <LinearGradient colors={[bgColor, '#d0e8ff80']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={[appStyles.appView, { backgroundColor: bgColor, paddingTop: insets.top }]}  >
            {/* <View style={[appStyles.appView, { backgroundColor: bgColor, paddingTop: insets.top }]}> */}
            <View style={[detStyles.textBox, { backgroundColor: appColors.overlayWhite }]}>
                <AppText text={weather?.location ?? ""} />
            </View>
            <View style={{ marginTop: 60 }}>
                <AppTextBig styles={{ fontSize: 65 }} text={`${degree}°C`} />
                <View style={detStyles.rowStyles}>
                    <AppText text={weather?.description ?? ""} />
                    <Image
                        source={{ uri: `https://openweathermap.org/img/wn/${weather?.icon}@2x.png` }}
                        style={detStyles.weatherIcons}
                    />
                </View>
                <View>

                </View>
            </View>
            <AppTextMid styles={{ padding: 20 }} text="5 Day Forecast" />
            <FlatList
                data={forecast}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <View style={[detStyles.forecastBox, { backgroundColor: appColors.overlayWhite }]}>
                            <AppText text={item.date.split(' ')[0]} />
                            <Image
                                source={{ uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png` }}
                                style={detStyles.smallIcons}
                            />
                            <AppText text={`${Math.round(item.temperature)}°`} />
                        </View>
                    );
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            />
        </LinearGradient>
    );
}

const detStyles = StyleSheet.create({
    textBox: {
        borderRadius: 25,
        padding: 8,
        paddingHorizontal: 15,
        alignSelf: 'center',
        margin: 8,
        marginTop: 25,
    },
    weatherIcons: {
        //backgroundColor: 'white',
        height: 95, width: 95,
        resizeMode: 'contain',
    },
    rowStyles: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 25
    },
    forecastBox: {
        height: 125,
        width: 90,
        padding: 8,
        margin: 8,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    smallIcons: {
        height: 55, width: 55,
        resizeMode: 'contain',
    },
});
