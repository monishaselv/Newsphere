import { Image, Pressable, ScrollView, StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import { AppText, AppTextBold } from "../components/AppText";
import { AppStrings } from "../../constants/AppStrings";
import { appStyles, styleSet } from "../styles/AppStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { setUnit } from "../../redux/slice/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import App from "../../../App";
import { RootState } from "../../redux/store";

const Settings = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const categories = [
        "Technology",
        "Entertainment",
        "Science",
        "Sports",
        "Business",
    ];
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const unit = useSelector((state: RootState) => state.dashboard.unit);
    const isEnabled = unit === 'Celsius';

    const toggleSwitch = () => {
        const newUnit = isEnabled ? 'Fahrenheit' : 'Celsius';
        dispatch(setUnit(newUnit));
    };
    const toggleCategory = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories((prev: any[]) => prev.filter(cat => cat !== category));
        } else {
            setSelectedCategories((prev: any) => [...prev, category]);
        }
    };
    const [isEnableds, setIsEnabled] = useState(false);
    const toggleSwitchs = () => {
        setIsEnabled(previousState => !previousState);

        setUnit('faren')
    }
    return (
        <View style={[appStyles.sreenView, { paddingTop: insets.top, backgroundColor: 'white' }]}>
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
                    <AppText text={isEnabled ? AppStrings.celcius : AppStrings.farenhiet} />
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#0808F7' : '#f4f3f4'}
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
                        <View style={{ backgroundColor: '#EDFBFF', padding: 15, borderRadius: 10, }}>
                            {categories.map((cat, index) => {
                                const isSelected = selectedCategories.includes(cat);
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => toggleCategory(cat)}
                                        style={[
                                            styleSet.categoryRow,
                                            isSelected && { backgroundColor: '#C1DFFF' },
                                        ]}
                                    >
                                        <AppText text={cat} />
                                        <Image
                                            style={[
                                                styleSet.checkStyles,
                                                { tintColor: isSelected ? '#0808F7' : '#999' }
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

export default Settings;