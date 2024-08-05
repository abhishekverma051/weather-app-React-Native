import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useLocations } from "./locationContext";
import { getDataFromAsyncStorage } from "../../utils/asyncStorage";

const API_KEY = "be1c284fc6564c83938100901242407";

const validateCityName = async (cityName) => {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${cityName}`
    );
    return response.status === 200 && response.data.length > 0;
  } catch (error) {
    console.error("Error validating city name:", error);
    return false;
  }
};

const fetchCitySuggestions = async (query) => {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`
    );
    if (response.status === 200 && response.data.length > 0) {
      return response.data.map((city) => city.name);
    }
    return [];
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
};

const SearchScreen = ({ navigation }) => {
  const [cityName, setCityName] = useState("");
  const { addLocation, locations, loadLocations } = useLocations();
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    loadLocations();
  }, []);

  const handleInputChange = async (text) => {
    setCityName(text);

    if (text) {
      const suggestions = await fetchCitySuggestions(text);
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSelectSuggestion = (city) => {
    setCityName(city);
    setFilteredSuggestions([]);
  };

  const handleSearch = async () => {
    if (cityName.trim()) {
      const isValid = await validateCityName(cityName);
      const normalizedCityName = cityName.trim().toLowerCase();

      const normalizedLocations = locations
        .filter((location) => typeof location === "string")
        .map((location) => location.toLowerCase());

      if (normalizedLocations.includes(normalizedCityName)) {
        Alert.alert(
          "Location Already Added",
          "This location is already added. Please enter a different location.",
          [
            {
              text: "OK",
              onPress: () => setCityName(""),
            },
          ]
        );
      } else if (isValid) {
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
        Alert.alert("Invalid Location", "Please enter a valid city name.");
      }
    } else {
      Alert.alert("Input Required", "Please enter a city name.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          placeholderTextColor="gray"
          value={cityName}
          onChangeText={handleInputChange}
        />
        {filteredSuggestions.length > 0 && (
          <FlatList
            data={filteredSuggestions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelectSuggestion(item)}
                style={styles.suggestion}
              >
                <Text style={styles.suggestionText}>{item}</Text>
              </Pressable>
            )}
            style={styles.suggestionsList}
          />
        )}
      </View>
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
  suggestion: {
    padding: 10,
    backgroundColor: "white",
    borderColor: "#bbb",
  },
  suggestionText: {
    fontSize: 18,
  },
  suggestionsList: {
    maxHeight: 150,
    borderRadius: 5,
  },
});

export default SearchScreen;
