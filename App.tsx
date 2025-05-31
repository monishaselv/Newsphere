import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigatior from './src/navigations/Navigation';

import { PermissionsAndroid, Platform } from 'react-native';
import { useEffect } from 'react';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

const App = () => {
 
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer >
          <AppNavigatior />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};
export default App;
// 67badab61a9644f1afa42c54565026f7