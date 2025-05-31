import { View, Image, StyleSheet, ImageBackground, Dimensions } from "react-native";
import { AppStrings } from "../../constants/AppStrings";
import { AppTextBold } from "./AppText";

export const NoDataWidget = () => {
    return (
        <View style={styles.noNews}>
            <AppTextBold text={AppStrings.noData}></AppTextBold>
        </View>
    );

}
const styles = StyleSheet.create({
    noNews: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageBackground: {
        flex: 1,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        position: 'absolute',
    },
})