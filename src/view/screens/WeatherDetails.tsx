import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Dimensions, Image, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { appColors } from "../../constants/AppColors";
import { AppText, AppTextBig, AppTextMid, AppTextSmall, AppTextSmallB } from "../components/AppText";
import { appStyles, detStyles, homeStyles } from "../styles/AppStyles";
import { RootState } from "../../redux/store";
import LinearGradient from "react-native-linear-gradient";
import DashboardViewModel from "../../viewModel/dashboardViewModel";
import { AppStrings } from "../../constants/AppStrings";

export const WeatherDetails = () => {
    const insets = useSafeAreaInsets();
    const views = DashboardViewModel();
    const navigation = useNavigation<any>();
    const weather = useSelector((state: RootState) => state.dashboard.weather);
    const forecast = useSelector((state: RootState) => state.dashboard.forecast);
    const degree = Math.round(weather?.temperature ?? 0);
    const weatherIcon = views.weatherIcons[weather?.condition ?? ""] || views.defaultIcon;
    const displayTemp = Math.round(views.convertTemp(degree));
    const defaultColor = '#EDFBFF';
    const bgColor = views.getWeatherColor(weather?.condition ?? "");
    return (
        <LinearGradient colors={[defaultColor, defaultColor]}
            style={[appStyles.sreenView, { paddingTop: insets.top }]}  >
            <LinearGradient colors={[defaultColor, bgColor]} style={detStyles.weatherCard}>
                <View style={[detStyles.rowStyles, { justifyContent: 'space-between' }]}>
                    <Pressable onPress={() => { navigation.pop() }} style={[detStyles.backIconOverlay, { backgroundColor: appColors.overlayWhite }]}>
                        <Image style={detStyles.backIcon} source={require('../../assets/images/back.png')} />
                    </Pressable>
                    <AppTextMid text={`${weather?.location}`} />
                    <View style={{ flex: 0.1 }} />
                </View>
                <View style={[homeStyles.weatherRow, detStyles.aligned]}>
                    <Image style={homeStyles.weatherIcons} source={weatherIcon} />
                    <View style={homeStyles.order}>
                        <AppTextSmall text={views.formattedDate} />
                        <AppTextBig text={`${displayTemp}${views.unitSymbol}`} styles={{ color: '#212155', fontSize: 39 }} />
                        <AppTextSmall text={`${weather?.condition ?? ""}+${weather?.description ?? ""}`} />
                    </View>
                </View>
                <View style={[homeStyles.weatherRows, detStyles.aligned]}>
                    <View style={homeStyles.weatherSmall}>
                        <Image style={homeStyles.smallIcon} source={require('../../assets/images/wind.png')} />
                        <AppTextSmallB text={`${weather?.windSpeed ?? ""}`}></AppTextSmallB>
                        <AppTextSmall text={AppStrings.windSpeed}></AppTextSmall>
                    </View>
                    <View style={homeStyles.weatherSmall}>
                        <Image style={homeStyles.smallIcon} source={require('../../assets/images/showers.png')} />
                        <AppTextSmallB text={`${weather?.rainChance ?? ""}`}></AppTextSmallB>
                        <AppTextSmall text={AppStrings.chanceofRain} ></AppTextSmall>
                    </View>
                    <View style={homeStyles.weatherSmall}>
                        <Image style={homeStyles.smallIcon} source={require('../../assets/images/drop.png')} />
                        <AppTextSmallB text={`${weather?.humidity ?? ""}`}></AppTextSmallB>
                        <AppTextSmall text={AppStrings.humidity}></AppTextSmall>
                    </View>
                </View>
            </LinearGradient>
            <AppTextMid styles={{ paddingHorizontal: 20, paddingVertical: 10, color: '#212155' }} text="5 Day Forecast" />
            <FlatList
                data={forecast}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    const forecastIcon = views.weatherIcons[item.condition] || views.defaultIcon;
                    return (
                        <View style={detStyles.forecastBox}>
                            <View style={detStyles.columnStyles}>
                                <AppTextMid text={`${views.getWeekday(item.date)}`} />
                                <AppText text={views.formatDay(item.date.split(' ')[0])} />
                            </View>
                            <View style={[detStyles.rowStyles, { columnGap: 10 }]}>
                                <Image style={detStyles.smallIcons} source={forecastIcon} />
                                <AppText text={item.condition} />
                            </View>
                            <View style={detStyles.rowStyles}>
                                <AppTextMid text={`${Math.round(item.temperature)}°`} />
                                <AppText text={`+ ${item.humidity}%`} />
                            </View>
                        </View>
                    );
                }}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            />
        </LinearGradient>
    );
}


