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

const API_KEY = "be1c284fc6564c83938100901242407";

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

const Weather = ({ navigation }) => {
  const [weatherData, setWeatherData] = useState([]);

  function getLocations() {
    return [
      {
        id: "1",
        location: "Mohali",
        condition: "Sunny",
        temp_c: "34",
      },
      {
        id: "2",
        location: "Chandigarh",
        condition: "Rainy",
        temp_c: "37",
      },
      {
        id: "3",
        location: "Shimla",
        condition: "Cold",
        temp_c: "27",
      },
      {
        id: "4",
        location: "Delhi",
        condition: "Hot",
        temp_c: "45",
      },
    ];
  }

  useEffect(() => {
    const data = getLocations();
    setWeatherData(data);
  }, []);

  useEffect(() => {}, [weatherData]);

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
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome
            name="user-circle"
            size={34}
            color="white"
            style={styles.icon1}
          />
        </TouchableOpacity>
      </View>

      <WeatherInfo weatherData={weatherData} navigation={navigation} />
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
});

export default Weather;