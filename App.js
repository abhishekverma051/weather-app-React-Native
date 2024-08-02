import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Weather from "./src/screens/app";
import SearchScreen from "./src/screens/app/searchBar";
import AqiScreen from "./src/screens/app/aqiScreen";
import WeatherScreen from "./src/screens/app/dataScreen";
import SplashScreen from "./src/screens/app/splashScreen";
import ProfileScreen from "./src/screens/auth/user";
import SettingScreen from "./src/screens/app/settingScreen";
import AboutPage from "./src/screens/auth/aboutScreen";
import { LocationProvider } from "./src/screens/app/locationContext";
import DetailedWeatherWrapper from "./src/screens/app/detailedWeather";

const Stack = createStackNavigator();

const App = () => {
  return (
    <LocationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerStyle: {
                backgroundColor: "rgb(40, 55, 50)",
              },
              headerShown: false,
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="Weather"
            component={Weather}
            options={{
              headerStyle: {
                backgroundColor: "rgb(40, 55, 50)",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{
              headerStyle: {
                backgroundColor: "rgb(40, 55, 50)",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="DetailedWeather"
            component={DetailedWeatherWrapper}
            options={{
              headerStyle: {
                backgroundColor: "rgb(40, 55, 50)",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="AQI"
            component={AqiScreen}
            options={{
              headerStyle: {
                backgroundColor: "rgb(40, 55, 50)",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="WeatherScreen"
            component={WeatherScreen}
            options={{
              headerStyle: {
                backgroundColor: "rgb(40, 55, 50)",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              headerStyle: {
                backgroundColor: "rgb(40, 55, 50)",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="SettingScreen"
            component={SettingScreen}
            options={{
              headerStyle: {
                backgroundColor: "rgb(40, 55, 50)",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="AboutScreen"
            component={AboutPage}
            options={{
              headerStyle: {
                backgroundColor: "rgb(40, 55, 50)",
              },
              headerTintColor: "#fff",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LocationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(40, 55, 50)",
  },
});

export default App;
