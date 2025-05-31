import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native"
import { appStyles } from "../styles/AppStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppText, AppTextBig, AppTextBold, AppTextMid, AppTextSmall } from "../components/AppText";
import DashboardViewModel from "../../viewModel/dashboardViewModel";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { NoDataWidget } from "../components/AppButtons";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";


const Dashboard = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();
    const views = DashboardViewModel();
    const location = useSelector((state: RootState) => state.dashboard.location);
    const loader = useSelector((state: RootState) => state.dashboard.loading);
    const weather = useSelector((state: RootState) => state.dashboard.weather);
    const news = useSelector((state: RootState) => state.dashboard.articles);
    const degree = Math.round(weather?.temperature ?? 0);
    const bgColor = views.backgroundColors[weather?.condition ?? ""] || views.defaultColor;
    useEffect(() => {
        views.requestLocation();
        views.fetchNews(degree);
    }, []);
    return (
        <View style={[appStyles.sreenView, { paddingTop: insets.top, backgroundColor: 'white', }]}>
            <View style={homeStyles.rowStyles}>
                <AppText text={`${location},India\n`} styles={{ marginTop: 15 }}>
                </AppText>
                <Pressable onPress={() => { navigation.navigate('Settings') }}>
                    <Image
                        resizeMode="contain" style={homeStyles.iconStyles} source={require('../../assets/images/settings.png')} />
                </Pressable>
            </View>
            <Pressable onPress={() => navigation.navigate('WeatherDetails')}>
                <LinearGradient colors={[bgColor, '#d0e8ff80']} style={homeStyles.weatherCard}>
                    <View style={homeStyles.weatherRow}>
                        <View style={homeStyles.order}>
                            <AppTextBig text={`${degree}°C`} styles={{ color: 'white' }} />
                            <AppText text={weather?.condition ?? ""} />
                        </View>
                        <View style={homeStyles.order2}>
                            <AppTextSmall text={`Humidity ${weather?.humidity}%`} />
                            <AppTextSmall text={views.formattedDate} />
                            <AppTextSmall text={`⚲ ${weather?.location}`} />
                        </View>
                    </View>
                    <Image
                        source={{ uri: `https://openweathermap.org/img/wn/${weather?.icon}@2x.png` }}
                        style={homeStyles.weatherIcons}
                    />
                </LinearGradient>
            </Pressable>
            <AppTextBold text="News that matches the sky" styles={{ padding: 10 }} />
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
                            <View style={homeStyles.newsCard}>
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
const homeStyles = StyleSheet.create({
    iconStyles: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
    },
    rowStyles: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 8,
        paddingHorizontal: 20
    },
    weatherCard: {
        borderRadius: 15,
        flexDirection: 'row',
        padding: 8,
        margin: 8,
        justifyContent: 'space-around',
        minHeight: 140,
    },
    weatherIcons: {
        height: 95, width: 95,
        justifyContent: 'center',
        resizeMode: 'contain',
        alignItems: 'center',
        alignSelf: 'center'
    },
    order: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    order2: {
        alignSelf: 'center',
        marginTop: 15
    },
    weatherRow: {
        flexDirection: 'row',
        columnGap: 14
    },
    newsCard: {
        columnGap: 20,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8,
        borderRadius: 15,
        padding: 15,
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 0.3
    },
    noNews: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1
    },
    newsImage: {
        height: 65,
        width: 65,
        borderRadius: 30 / 2,
    }
})