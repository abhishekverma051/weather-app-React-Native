import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const WeatherScreen = ({ route, navigation }) => {
  const { cityName } = route.params;
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=${cityName}&days=1`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [cityName]);

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text>No data found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Weather data for {cityName}</Text>
      <Button
        title="View Details"
        onPress={() => navigation.navigate("DetailedWeather", { weatherData })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WeatherScreen;
