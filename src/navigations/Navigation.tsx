import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../view/screens/Dashboard";
import Settings from "../view/screens/Settings";
import { WeatherDetails } from "../view/screens/WeatherDetails";

const Stack = createNativeStackNavigator();
const AppNavigatior = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="WeatherDetails" component={WeatherDetails} />
        </Stack.Navigator>
    );
}
export default AppNavigatior;