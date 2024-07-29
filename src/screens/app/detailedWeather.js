import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { getMyData } from ".";

const DetailedWeather = ({ route, navigation }) => {
  const [weatherData, setWeatherData] = useState([]);
  const { location } = route?.params ?? "";

  if (!location || location.length < 1) {
    return <View></View>;
  }
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getMyData(location).then((res) => {
      setWeatherData(res);
    });
  }, []);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Weather data not available</Text>
      </View>
    );
  }

  const renderForecastItem = ({ item }) => (
    <View style={styles.forecastItem}>
      <Text style={styles.forecastTime}>
        {item.time ? item.time.split(" ")[1] : "N/A"}
      </Text>
      <Image
        style={styles.icon}
        source={{ uri: `https:${item.condition.icon}` }}
      />
      <Text style={styles.forecastTemp}>{item.temp_c}°C</Text>
      <Text style={styles.forecastCondition}>{item.condition.text}</Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.cityName}>{weatherData.location.name}</Text>
      <Text style={styles.text}>{weatherData.location.tz_id}</Text>
      <Text style={styles.text}>{weatherData.location.localtime}</Text>
    </View>
  );

  const renderHeader2 = () => (
    <View style={styles.weatherHeading}>
      <View style={styles.leftContainer}>
        <Text style={styles.heading}>Weather</Text>
        <Text style={styles.condition1}>
          {weatherData.current.condition.text}
        </Text>
        <Text style={styles.temperature}>{weatherData.current.temp_c}°C</Text>
      </View>
      <Image
        style={styles.icon1}
        source={{ uri: `https:${weatherData.current.condition.icon}` }}
      />
    </View>
  );

  const renderDetails = () => (
    <View>
      <View style={styles.detailsRow}>
        <View style={styles.detailContainer}>
          <Feather name="wind" size={24} color="white" />
          <Text style={styles.detailLabel}>Wind Speed</Text>
          <Text style={styles.detailValue}>
            {weatherData.current.wind_kph} kph
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <Feather name="droplet" size={24} color="white" />
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>
            {weatherData.current.humidity}%
          </Text>
        </View>
      </View>
      <View style={styles.detailsRow}>
        <View style={styles.detailContainer}>
          <Feather name="thermometer" size={24} color="white" />
          <Text style={styles.detailLabel}>Feels Like</Text>
          <Text style={styles.detailValue}>
            {weatherData.current.feelslike_c}°C
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <Feather name="sunset" size={24} color="yellow" />
          <Text style={styles.detailLabel}>Sunset</Text>
          <Text style={styles.detailValue}>
            {weatherData.forecast.forecastday[0].astro.sunset}
          </Text>
        </View>
      </View>
      <View style={styles.detailsRow}>
        <View style={styles.detailContainer}>
          <Feather name="sun" size={24} color="white" />
          <Text style={styles.detailLabel}>UV Index</Text>
          <Text style={styles.detailValue}>{weatherData.current.uv}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Feather name="bar-chart-2" size={24} color="white" />
          <Text style={styles.detailLabel}>Pressure</Text>
          <Text style={styles.detailValue}>
            {weatherData.current.pressure_mb} mb
          </Text>
        </View>
      </View>
    </View>
  );

  const renderForecastSection = () => (
    <View style={styles.forecastSection}>
      <Text style={styles.forecastTitle}>24 Hour Forecast</Text>
      <FlatList
        data={weatherData.forecast.forecastday[0].hour}
        renderItem={renderForecastItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.forecastList}
      />
    </View>
  );

  const renderFullWeekForecast = () => {
    const forecastData = weatherData.forecast.forecastday.slice(0, 7);

    return (
      <View style={styles.forecastSection1}>
        <Text style={styles.forecastTitle}>Full Week Forecast</Text>
        <FlatList
          data={forecastData}
          renderItem={({ item }) => (
            <View style={styles.forecastItem1}>
              <View style={styles.forecastItemContent}>
                <Text style={styles.forecastDate}>{item.date}</Text>
                <Image
                  style={styles.icon}
                  source={{ uri: `https:${item.day.condition.icon}` }}
                />
                <Text style={styles.forecastTemp}>{item.day.avgtemp_c}°C</Text>
                <Text style={styles.forecastCondition}>
                  {item.day.condition.text}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.date}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.forecastList}
        />
      </View>
    );
  };

  const data = [
    { type: "header" },
    { type: "header2" },
    { type: "forecastSection" },
    { type: "fullWeekForecast" },
    { type: "details" },
  ];

  const renderItem = ({ item }) => {
    if (item.type === "header") return renderHeader();
    if (item.type === "header2") return renderHeader2();
    if (item.type === "forecastSection") return renderForecastSection();
    if (item.type === "fullWeekForecast") return renderFullWeekForecast();
    if (item.type === "details") return renderDetails();
    return null;
  };

  if (!weatherData || weatherData.length < 1) {
    return <View></View>;
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
      ListFooterComponent={
        <TouchableOpacity
          style={styles.footer}
          onPress={() => navigation.navigate("AQI", { weatherData })}
        >
          <View style={styles.footerContent}>
            <Text style={styles.detailLabel}>AQI Index:</Text>
            <Text style={styles.detailValue}>80</Text>
          </View>
        </TouchableOpacity>
      }
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          colors={["#ffffff"]}
          tintColor={"#ffffff"}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(40, 55, 50)",
    padding: 20,
    flexGrow: 1,
  },
  errorText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  headerContainer: {
    marginBottom: 10,
  },
  cityName: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "left",
    marginVertical: 10,
    color: "#fff",
  },
  text: {
    color: "white",
  },
  weatherHeading: {
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  heading: {
    textAlign: "left",
    fontSize: 24,
    color: "white",
    padding: 10,
  },
  condition1: {
    color: "white",
    margin: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "left",
    color: "#fffc",
  },
  icon1: {
    width: 100,
    height: 100,
  },
  leftContainer: {
    flex: 1,
  },
  forecastSection: {
    marginVertical: 10,
  },
  forecastTitle: {
    fontSize: 20,
    color: "white",
    marginBottom: 10,
    marginHorizontal: 5,
  },
  forecastItem: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
    maxWidth: 120,
  },
  forecastTime: {
    color: "white",
    fontSize: 16,
  },
  icon: {
    width: 60,
    height: 60,
    paddingTop: 10,
  },
  forecastTemp: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  forecastCondition: {
    color: "white",
  },
  forecastList: {
    paddingHorizontal: 5,
    gap: 10,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  detailContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  detailLabel: {
    color: "white",
    fontSize: 16,
  },
  detailValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forecastItem1: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    margin: 5,
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  forecastSection1: {
    flex: 1,
  },
  forecastItemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    padding: 8,
  },
  forecastDate: {
    color: "white",
    fontSize: 12,
    flex: 1,
    textAlign: "left",
  },
  forecastTemp: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  forecastCondition: {
    color: "white",
    flex: 2,
    textAlign: "right",
  },
});

export default DetailedWeather;
