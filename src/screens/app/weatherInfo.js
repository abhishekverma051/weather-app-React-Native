import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import DraggableFlatList from "react-native-draggable-flatlist";
import {
  getDataFromAsyncStorage,
  removeDataFromAsyncStorage,
} from "../../utils/asyncStorage";

const WeatherInfo = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

   const fetchData = async () => {
    setRefreshing(true);
    const updatedData = await getDataFromAsyncStorage();
    setData(updatedData);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();  
  }, []);

  const handleDelete = async (item) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await removeDataFromAsyncStorage(item.location);
            await fetchData();  
          },
        },
      ]
    );
  };

  const renderRightActions = (data) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleDelete(data)}
    >
      <MaterialIcons name="delete-forever" size={44} color="red" />
    </TouchableOpacity>
  );

  const renderItem = ({ item, index, drag }) => (
    <Swipeable renderRightActions={() => renderRightActions(item)}>
      <TouchableOpacity
        style={styles.weatherBox}
        onPress={() =>
          navigation.navigate("DetailedWeather", {
            location: item?.location ?? "",
          })
        }
        onLongPress={drag}
      >
        <View style={styles.leftContainer}>
          <Text style={styles.cityName}>{item.location}</Text>
          <Text style={styles.condition}>{item.condition}</Text>
        </View>
        <Text style={styles.temperature}>{item.temp}°C</Text>
      </TouchableOpacity>
    </Swipeable>
  );

  const onRefresh = useCallback(() => {
    fetchData();  
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {data && data.length > 0 ? (
          <DraggableFlatList
            data={data}
            onDragEnd={({ data }) => setData(data)}
            renderItem={renderItem}
            keyExtractor={(item) => item.location || item.id}
            contentContainerStyle={styles.flatListContent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <View style={styles.centered}>
            <ActivityIndicator size={"large"} color={"red"} />
          </View>
        )}
      </View>
    </GestureHandlerRootView>
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
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "90%",
    borderRadius: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WeatherInfo;
