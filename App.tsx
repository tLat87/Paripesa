import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./src/redux/store";
import HomeScreen from "./src/screens/HomeScreen";
import SavedQuotesScreen from "./src/screens/SavedQuotesScreen";
import StatisticsScreen from "./src/screens/StatisticsScreen";
import InspirationScreen from "./src/screens/InspirationScreen";
import WelcomeScreen from "./src/screens/WellcomeScreen";
import WelcomeScreen2 from "./src/screens/WelcomeScreen2";
import WelcomeScreen3 from "./src/screens/WelcomeScreen3";
import WelcomeScreen4 from "./src/screens/WelcomeScreen4";
import OnBoardScreen from "./src/screens/OnBoardScreen";
import ProfileSetupScreen from "./src/screens/ProfileSetupScreen";

const Stack = createStackNavigator();

const leftCu = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => {navigation.goBack()}} style={{marginLeft: 16, transform: [{scaleX: -1}]}}>

        </TouchableOpacity>
        )
    }

export default function App() {

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    {/*<BackgroundMusic />*/}
                    <Stack.Navigator screenOptions={{
                        headerStyle: { backgroundColor: '#000000', },
                        headerLeft: leftCu,
                        headerTitle: () => (
                            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', width: '100%'}}>
                            {/*<Text>*/}
                            {/*    Wonders of Holland*/}
                            {/*</Text>*/}
                            </View>
                        ),
                        headerShadowVisible: false,
                    }}>

                        {/*<Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />*/}
                        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="WelcomeScreen2" component={WelcomeScreen2} options={{ headerShown: false }} />
                        <Stack.Screen name="WelcomeScreen3" component={WelcomeScreen3} options={{ headerShown: false }} />
                        <Stack.Screen name="WelcomeScreen4" component={WelcomeScreen4} options={{ headerShown: false }} />

                        <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="ProfileSetupScreen" component={ProfileSetupScreen} options={{ headerShown: false }} />

                        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="SavedQuotesScreen" component={SavedQuotesScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="StatisticsScreen" component={StatisticsScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="InspirationScreen" component={InspirationScreen} options={{ headerShown: false }} />

                    </Stack.Navigator>
                </NavigationContainer>
          </PersistGate>
         </Provider>
    );
}
