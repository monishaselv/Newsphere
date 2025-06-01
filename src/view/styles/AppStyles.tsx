import { useTheme } from "@react-navigation/native";
import { Dimensions, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const appStyles = StyleSheet.create({
    sreenView: {
        flex: 1,
    },
})
export const homeStyles = StyleSheet.create({
    iconStyles: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        tintColor: '#212155'
    },
    rowStyles: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 8,
        paddingHorizontal: 20
    },
    weatherCard: {
        borderRadius: 30,
        alignItems: 'center',
        padding: 8,
        margin: 8,
        justifyContent: 'space-evenly',
        minHeight: '36%',
    },
    weatherIcons: {
        height: 105, width: 110,
        justifyContent: 'center',
        resizeMode: 'contain',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20
    },
    order: {
        justifyContent: 'center',
    },
    smallIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    weatherRow: {
        flexDirection: 'row',
        columnGap: 14
    },
    weatherRows: {
        flexDirection: 'row',
        columnGap: 30
    },
    weatherSmall: {
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 2
    },
    newsCard: {
        columnGap: 20,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8,
        borderRadius: 15,
        padding: 15,
        borderColor: '#2D74A670',
        borderWidth: 0.5
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
});
export const styleSet = StyleSheet.create({
    rowStyles: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
    },
    prefStyles: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#EDFBFF',
        borderRadius: 10,
    },
    iconStyles: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    checkStyles: {
        height: 40,
        width: 40,
        resizeMode: 'contain',
    },
    content: {
        paddingHorizontal: 25,
        paddingVertical: 5
    },
    sectionTitle: {
        marginBottom: 10,
    },
    categoryRow: {
        backgroundColor: '#DEEEF3',
        borderRadius: 8,
        padding: 15,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
export const detStyles = StyleSheet.create({
    weatherCard: {
        borderRadius: 30,
        justifyContent: 'space-evenly',
        minHeight: 300,
        marginVertical: 10
    },
    aligned: {
        alignSelf: 'center'
    },
    backIcon: {
        height: 19, width: 20,
        resizeMode: 'contain',
    },
    backIconOverlay: {
        height: 38, width: 38,
        borderRadius: 38 / 2,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20
    },
    rowStyles: {
        flexDirection: 'row',
        columnGap: 6,
        alignItems: 'center'
    },
    columnStyles: {
        columnGap: 6
    },
    forecastBox: {
        flexDirection: 'row',
        padding: 10,
        paddingVertical: 12,
        margin: 8,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 0.3
    },
    forecastBox1: {
        height: 125,
        width: 90,
        padding: 8,
        margin: 8,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    smallIcons: {
        height: 50, width: 50,
        resizeMode: 'contain',
    },
});