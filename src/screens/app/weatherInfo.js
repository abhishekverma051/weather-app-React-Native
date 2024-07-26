import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

const WeatherInfo = ({ weatherData, navigation }) => {
  const {} = weatherData;

  const [data, setData] = useState(weatherData);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.weatherBox}
        onPress={() =>
          navigation.navigate("DetailedWeather", {
            location: item?.location ?? "",
          })
        }
      >
        <View style={styles.leftContainer}>
          <Text style={styles.cityName}>{item.location}</Text>
          <Text style={styles.condition}>{item.condition}</Text>
        </View>
        <Text style={styles.temperature}>{item.temp_c}°C</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  weatherBox: {
    width: "100%",
    padding: 20,
    backgroundColor: "rgba(240, 255, 250, 0.7)",
    borderRadius: 10,
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  leftContainer: {
    flex: 1,
  },
  cityName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  condition: {
    fontSize: 18,
    marginLeft: 5,
  },
  temperature: {
    fontSize: 34,
    fontWeight: "bold",
  },
});

export default WeatherInfo;
