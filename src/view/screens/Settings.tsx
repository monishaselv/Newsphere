import { Image, Pressable, ScrollView, StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import { AppText, AppTextBold } from "../components/AppText";
import { AppStrings } from "../../constants/AppStrings";
import { appStyles } from "../styles/AppStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();
    const categories = [
        "Technology",
        "Entertainment",
        "Science",
        "Sports",
        "Business",
    ];
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const toggleCategory = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories((prev: any[]) => prev.filter(cat => cat !== category));
        } else {
            setSelectedCategories((prev: any) => [...prev, category]);
        }
    };
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View style={[appStyles.appView, { paddingTop: insets.top, backgroundColor: '#EFEFFF' }]}>
            <View style={styleSet.rowStyles}>
                <Pressable onPress={() => navigation.pop()}>
                    <Image style={styleSet.iconStyles} source={require('../../assets/images/back.png')} />
                </Pressable>
                <AppTextBold styles={{ fontSize: 15, fontFamily: 'Inter_Bold' }} text={AppStrings.settings}></AppTextBold>
                <View />
            </View>
            <View style={{ paddingHorizontal: 25, paddingVertical: 15 }}>
                <AppTextBold text={AppStrings.pref} styles={styleSet.sectionTitle} />
                <View style={styleSet.prefStyles}>
                    <AppText text={AppStrings.celcius} />
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
            <View >
                <ScrollView style={styleSet.content}>
                    <View>
                        <AppTextBold text={AppStrings.newsCat} styles={styleSet.sectionTitle} />
                        <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, }}>
                            {categories.map((cat, index) => {
                                const isSelected = selectedCategories.includes(cat);
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => toggleCategory(cat)}
                                        style={[
                                            styleSet.categoryRow,
                                            isSelected && { backgroundColor: '#D0E8FF' },
                                        ]}
                                    >
                                        <AppText text={cat} />
                                        <Image
                                            style={[
                                                styleSet.checkStyles,
                                                { tintColor: isSelected ? '#5724D0' : '#999' }
                                            ]}
                                            source={require('../../assets/images/check.png')}
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>
            </View>

        </View>
    );
}
const styleSet = StyleSheet.create({
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
        backgroundColor: 'white',
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
        backgroundColor: '#E5E5E5',
        borderRadius: 8,
        padding: 15,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
export default Settings;