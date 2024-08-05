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
import PagerView from "react-native-pager-view";

const DetailedWeather = ({ location = "Chandigarh" }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getMyData(location).then((res) => {
      setWeatherData(res);
    });
  }, [location]);

  // useEffect(() => {
  //   console.log(allLocations);
  // }, [])

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  if (!weatherData || weatherData.length < 1) {
    return (
      <View style={styles.container}>
         
      </View>
    );
  }
  // component 1

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.cityName}>{weatherData.location.name}</Text>
      <Text style={styles.text}>{weatherData.location.tz_id}</Text>
      <Text style={styles.text}>{weatherData.location.localtime}</Text>
    </View>
  );
  // component 2

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
  //component 3
  // 24 hour forecast
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

  // component 4
  // 7 days forecast
  const renderFullWeekForecast = () => {
    const forecastData = weatherData.forecast.forecastday.slice(0, 7);

    return (
      <View style={styles.forecastSection1}>
        <Text style={styles.forecastTitle}>Full Week Forecast</Text>
        <View style={styles.fullWeekContainer}>
          {forecastData.map((item) => (
            <View key={item.date} style={styles.forecastItem1}>
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
          ))}
        </View>
      </View>
    );
  };
  // component 5
  const renderDetails = () => (
    <View>
      <Text style={styles.forecastTitle}>Condition</Text>
      <View style={styles.detailsRow}>
        <View style={styles.detailContainer}>
          <Feather name="wind" size={24} color="skyblue" />
          <Text style={styles.detailLabel}>Wind Speed</Text>
          <Text style={styles.detailValue}>
            {weatherData.current.wind_kph} kph
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <Feather name="droplet" size={24} color="#9697e8" />
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>
            {weatherData.current.humidity}%
          </Text>
        </View>
      </View>
      <View style={styles.detailsRow}>
        <View style={styles.detailContainer}>
          <Feather name="thermometer" size={24} color="red" />
          <Text style={styles.detailLabel}>Feels Like</Text>
          <Text style={styles.detailValue}>
            {weatherData.current.feelslike_c}°C
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <Feather name="sunset" size={24} color="#f9a61d" />
          <Text style={styles.detailLabel}>Sunset</Text>
          <Text style={styles.detailValue}>
            {weatherData.forecast.forecastday[0].astro.sunset}
          </Text>
        </View>
      </View>
      <View style={styles.detailsRow}>
        <View style={styles.detailContainer}>
          <Feather name="sun" size={24} color="#c9f5ef" />
          <Text style={styles.detailLabel}>UV Index</Text>
          <Text style={styles.detailValue}>{weatherData.current.uv}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Feather name="bar-chart-2" size={24} color="#c8a7f2" />
          <Text style={styles.detailLabel}>Pressure</Text>
          <Text style={styles.detailValue}>
            {weatherData.current.pressure_mb} mb
          </Text>
        </View>
      </View>
    </View>
  );

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

  return (
    <View style={styles.page}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item?.location?.name || index.toString()}
        contentContainerStyle={styles.flatListContent}
        ListFooterComponent={
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.footer}
              onPress={() => navigation.navigate("AQI", { weatherData })}
            >
              <View style={styles.footerContent}>
                <Text style={styles.detailLabel}>AQI Index:</Text>
                <Text style={styles.detailValue}>80</Text>
              </View>
            </TouchableOpacity>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const DetailedWeatherWrapper = ({ route, navigation }) => {
  const { location, allLocations = [] } = route.params;
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    let locationIndex = allLocations.findIndex(
      (val) => val.location === location
    );
    if (locationIndex < 0) locationIndex = 0;
    setPageIndex(locationIndex);
  }, []);

  return (
    <PagerView
      style={{
        flex: 1,
        backgroundColor: "rgb(40, 55, 50)",
      }}
      initialPage={pageIndex}
    >
      {allLocations.map((locationData, index) => (
        <DetailedWeather location={locationData.location} />
      ))}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(40, 55, 50)",
    padding: 20,
    flex: 1,
  },
  flatListContent: {
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
    margin: 5,
    marginLeft: 10,
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
    margin: 5,
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
  footerContainer: {
    marginBottom: 10,
  },
  footer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    marginLeft: 7,
    marginRight: 7,
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
    marginVertical: 10,
  },
  fullWeekContainer: {
    maxHeight: 1000,
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
  page: {
    flex: 1,
  },
});

export default DetailedWeatherWrapper;
