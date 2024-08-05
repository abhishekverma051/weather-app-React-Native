import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
  TextInput,
} from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useLocations } from "./locationContext";
import {
  getDataFromAsyncStorage,
  setDataToAsyncStorage,
 } from "/Users/tanmaygirdhar/ReactNative/WeatherApp/src/utils/asyncStorage.js";

const WeatherInfo = ({ navigation }) => {
  const { locations, removeLocation } = useLocations();
  const [data, setData] = useState(locations);
  const [refreshing, setRefreshing] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [newLocation, setNewLocation] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const storedData = await getDataFromAsyncStorage();
      setData(storedData);
    };
    loadData();
  }, []);

  useEffect(() => {
    setData(locations);
  }, [locations]);

  const fetchData = async () => {
    setRefreshing(true);
    const updatedData = await getDataFromAsyncStorage();
    setData(updatedData);
    setRefreshing(false);
  };

  const confirmDelete = (location) => {
    Alert.alert(
      "Delete Location",
      `Are you sure you want to delete ${location.location}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDelete(location),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleDelete = (location) => {
    removeLocation(location.location);
  };

  const handleEdit = async (location) => {
    setEditingLocation(location.location);
    setNewLocation(location.location);
  };

  const confirmEdit = async () => {
    if (newLocation.trim() !== "") {
      const updatedData = data.map((item) =>
        item.location === editingLocation
          ? { ...item, location: newLocation }
          : item
      );
      setData(updatedData);
      setDataToAsyncStorage(updatedData);
      setEditingLocation(null);
      const locationData = await getDataFromAsyncStorage();
      setData(locationData);
    }
  };

  const renderRightActions = (item) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => confirmDelete(item)}
    >
      <MaterialIcons name="delete-forever" size={44} color="red" />
    </TouchableOpacity>
  );

  const renderLeftActions = (item) => (
    <TouchableOpacity
      style={styles.editButton}
      onPress={() => handleEdit(item)}
    >
      <MaterialIcons name="edit" size={44} color="blue" />
    </TouchableOpacity>
  );

  const renderItem = ({ item, drag }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item)}
      renderLeftActions={() => renderLeftActions(item)}
    >
      {editingLocation === item.location ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            value={newLocation}
            onChangeText={setNewLocation}
          />
          <TouchableOpacity style={styles.confirmButton} onPress={confirmEdit}>
            <Text style={styles.confirmButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.weatherBox}
          onPress={() =>
            navigation.navigate("DetailedWeather", {
              location: item?.location ?? "",
              allLocations: data,
            })
          }
          onLongPress={drag}
        >
          <View style={styles.leftContainer}>
            <Text style={styles.cityName1}>{item.location}</Text>
            <Text style={styles.condition}>{item.condition}</Text>
          </View>
          <Text style={styles.temperature}>{item.temp}°C</Text>
        </TouchableOpacity>
      )}
    </Swipeable>
  );

  const onRefresh = useCallback(() => {
    fetchData();
  }, []);

  const handleDragEnd = ({ data }) => {
    setData(data);
    setDataToAsyncStorage(data);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {data && data.length > 0 ? (
          <DraggableFlatList
            data={data}
            onDragEnd={handleDragEnd}
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
  cityName1: {
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
  editButton: {
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
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(240, 255, 250, 0.7)",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default WeatherInfo;
