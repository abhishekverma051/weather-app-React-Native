import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useLocations } from "./locationContext";  

const SearchScreen = ({ navigation }) => {
  const [cityName, setCityName] = useState("");
  const { addLocation } = useLocations();

  const handleSearch = async () => {
    if (cityName.trim()) {
      Alert.alert(
        "Confirm Modification",
        "Are you sure you want to add this location?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              addLocation(cityName);  
              navigation.navigate("Weather", { cityName });  
            },
          },
        ]
      );
    } else {
      Alert.alert("Please enter a city name");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        placeholderTextColor="gray"
        value={cityName}
        onChangeText={setCityName}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.button}>
        <FontAwesome name="search" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgb(40, 55, 50)",
    flexDirection: "row",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    width: "70%",
    borderRadius: 12,
    color: "black",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  button: {
    marginLeft: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#3b3b3b",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default SearchScreen;
