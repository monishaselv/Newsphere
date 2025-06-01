import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native"
import { appStyles, homeStyles } from "../styles/AppStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppText, AppTextBig, AppTextBold, AppTextBolder, AppTextMid, AppTextSmall, AppTextSmallB } from "../components/AppText";
import DashboardViewModel from "../../viewModel/dashboardViewModel";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { NoDataWidget } from "../components/AppButtons";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { AppStrings } from "../../constants/AppStrings";
import { appColors } from "../../constants/AppColors";


const Dashboard = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();
    const views = DashboardViewModel();
    const location = useSelector((state: RootState) => state.dashboard.location);
    const loader = useSelector((state: RootState) => state.dashboard.loading);
    const weather = useSelector((state: RootState) => state.dashboard.weather);
    const news = useSelector((state: RootState) => state.dashboard.articles);
    const degree = Math.round(weather?.temperature ?? 0);
    const displayTemp = Math.round(views.convertTemp(degree));
    const weatherIcon = views.weatherIcons[weather?.condition ?? ""] || views.defaultIcon;
    const bgColor = views.getWeatherColor(weather?.condition ?? "");
    useEffect(() => {
        views.requestLocation();
        views.fetchNews(degree);
    }, []);
    return (
        <View style={[appStyles.sreenView, { paddingTop: insets.top, backgroundColor: views.defaultColor, }]}>
            <View style={homeStyles.rowStyles}>
                <AppTextBolder text={`Newsphere`} styles={{ marginTop: 10, fontSize: 18 }} />
                <Pressable onPress={() => { navigation.navigate('Settings') }}>
                    <Image
                        resizeMode="contain" style={homeStyles.iconStyles}
                        source={require('../../assets/images/settings.png')} />
                </Pressable>
            </View>
            <Pressable onPress={() => navigation.navigate('WeatherDetails')}>
                <LinearGradient colors={[views.defaultColor, bgColor]} style={homeStyles.weatherCard}>
                    <AppTextMid text={`${location}`} styles={{ marginTop: 10 }} />
                    <View style={homeStyles.weatherRow}>
                        <Image style={homeStyles.weatherIcons} source={weatherIcon} />
                        <View style={homeStyles.order}>
                            <AppTextSmall text={views.formattedDate} />
                            <AppTextBig text={`${displayTemp}${views.unitSymbol}`} styles={{ color: '#212155', fontSize: 39 }} />
                            <AppTextSmall text={`${weather?.condition ?? ""}+${weather?.description ?? ""}`} />
                        </View>
                    </View>
                    <View style={homeStyles.weatherRows}>
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
            </Pressable>
            <AppTextBold text={AppStrings.newsSky} styles={{ padding: 10, color: '#212155' }} />
            <FlatList
                data={news}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() =>
                    loader ?
                        <View style={homeStyles.noNews}>
                            <ActivityIndicator size="large" color='blue' />
                        </View> :
                        <NoDataWidget />}
                renderItem={({ item, index }) => {
                    return (
                        <Pressable onPress={() => views.openNewsLink(item.url)}>
                            <View style={[homeStyles.newsCard]}>
                                <Image style={homeStyles.newsImage}
                                    resizeMode="cover"
                                    source={{ uri: item.urlToImage || 'https://via.placeholder.com/150' }} />
                                <View style={{ width: '70%' }}>
                                    <AppTextMid text={item.title} />
                                    <View style={homeStyles.weatherRow}>
                                        <AppTextSmall text={item.source.name} />
                                        <AppTextSmall text={views.timeAgo(item.publishedAt)} />
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    )
                }}
            />
        </View>
    );
}
export default Dashboard;
