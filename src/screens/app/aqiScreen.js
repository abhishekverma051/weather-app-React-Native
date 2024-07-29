import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";

export default function AqiScreen({ route }) {
  const { weatherData } = route.params;
  const air_quality = weatherData.air_quality;

  const openUrl = () => {
    Linking.openURL("https://www.accuweather.com/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headCont}>
        <Text style={styles.heading}>Air Quality Index</Text>
        <Text style={styles.cityName}>
          {weatherData.location.name} Published at{" "}
          {weatherData.location.localtime}
        </Text>
        {air_quality ? (
          <>
            <Text style={styles.airQualityText}>CO: {air_quality.co}</Text>
            <Text style={styles.airQualityText}>NO2: {air_quality.no2}</Text>
            <Text style={styles.airQualityText}>O3: {air_quality.o3}</Text>
            <Text style={styles.airQualityText}>SO2: {air_quality.so2}</Text>
            <Text style={styles.airQualityText}>
              PM2.5: {air_quality.pm2_5}
            </Text>
            <Text style={styles.airQualityText}>PM10: {air_quality.pm10}</Text>
            <Text style={styles.airQualityText}>
              US EPA Index: {air_quality["us-epa-index"]}
            </Text>
            <Text style={styles.airQualityText}>
              GB DEFRA Index: {air_quality["gb-defra-index"]}
            </Text>
          </>
        ) : (
          <Text style={styles.cityName}>Air quality data not available</Text>
        )}
        <Text style={styles.reminderText}>Wear a mask when you go out.</Text>
        <View>
          <TouchableOpacity onPress={openUrl}>
            <Text style={styles.linkText}>More on air quality</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(40, 55, 50)",
    padding: 16,
  },
  headCont: {
    margin: 12,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
  },
  heading: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 12,
  },
  cityName: {
    color: "white",
    fontSize: 18,
    marginBottom: 8,
  },
  airQualityText: {
    color: "white",
    fontSize: 18,
    marginVertical: 4,
  },
  reminderText: {
    color: "white",
    fontSize: 16,
    marginVertical: 12,
    fontStyle: "italic",
  },
  linkText: {
    color: "#00BFFF",
    fontSize: 18,
    textDecorationLine: "underline",
    marginTop: 16,
  },
});
