import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import WeatherInfo from "./weatherInfo";
 
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import {
  getDataFromAsyncStorage,
  setDataToAsyncStorage,
} from "../../utils/asyncStorage";
 
import * as Location from "expo-location";

const API_KEY = "be1c284fc6564c83938100901242407";
const OPENCAGE_API_KEY = "d83eeea8f3484697aa84fb797bd8a03f";

const fetchAddressFromCoordinates = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
    );

    console.log("OpenCage API Response:", response.data);

    if (
      response.data &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      const components = response.data.results[0].components;
      return (
        components.city ||
        components.town ||
        components.village ||
        "Unknown location"
      );
    } else {
      console.error("No results found for the given coordinates.");
      return "Unknown location";
    }
  } catch (error) {
    console.error("Error fetching address:", error.message);
    return "Error fetching location";
  }
};

export async function getMyData(cityName) {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=7&aqi=no&alerts=no`
    );

    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    Alert.alert("Error", error.message);
  }
}

const Weather = ({ navigation, route }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const [currentTemp, setCurrentTemp] = useState("");
  const [currentCondition, setCurrentCondition] = useState("");
  const cityName = route?.params?.cityName;

  async function getLocations() {
    const data = await getDataFromAsyncStorage();
    return data;
  }

  const fetchCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    const { latitude, longitude } = location.coords;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    const address = await fetchAddressFromCoordinates(latitude, longitude);
    setCurrentLocation(address);

    const weatherData = await getMyData(`${latitude},${longitude}`);
    console.log("Weather Data for Current Location:", weatherData);

    if (weatherData && weatherData.current) {
      setCurrentTemp(weatherData.current.temp_c);
      setCurrentCondition(weatherData.current.condition.text);
    }
  };

  useEffect(() => {
    fetchCurrentLocation();
    getLocations().then((res) => {
      setWeatherData(res);
    });
  }, [cityName]);

  useEffect(() => {
    console.log(weatherData, "index");
  }, [weatherData]);

  if (!weatherData || weatherData.length < 1) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#cef" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity>
          <FontAwesome
            name="list-ul"
            size={28}
            color="white"
            style={styles.icon}
            onPress={() => navigation.navigate("SettingScreen")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome
            name="user-circle"
            size={34}
            color="white"
            style={styles.icon1}
            onPress={() => navigation.navigate("ProfileScreen")}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("DetailedWeather", {
            location: currentLocation,
            allLocations: [currentLocation],
          })
        }
      >
        <View style={styles.locationHeader}>
          <View>
            <Text style={styles.locationText}>{currentLocation}</Text>
            <Text style={styles.locationCondition}>{currentCondition}</Text>
          </View>
          <Text style={styles.locationTemp}>{currentTemp}°C</Text>
        </View>
      </TouchableOpacity>

      {weatherData && weatherData.length > 0 && (
        <WeatherInfo weatherData={weatherData} navigation={navigation} />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Search")}
      >
        <AntDesign name="pluscircle" size={54} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(40, 55, 50)",
  },
  button: {
    position: "absolute",
    bottom: 30,
    right: 30,
    marginBottom: 20,
  },
  icon: {
    marginLeft: 12,
    margin: 12,
  },
  icon1: {
    marginRight: 12,
    margin: 12,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationHeader: {
    padding: 10,
    backgroundColor: "rgba(240, 255, 250, 0.7)",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    width: "95%",
    zIndex: 1,
    position: "relative",
    borderRadius: 12,
    margin: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
    marginLeft: 12,
  },
  locationTemp: {
    fontWeight: "bold",
    fontSize: 34,
  },
  locationCondition: {
    fontSize: 18,
    color: "black",
    marginBottom: 10,
    marginLeft: 12,
  },
});
export default Weather;
