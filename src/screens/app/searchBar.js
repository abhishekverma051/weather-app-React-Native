import React, { useState } from "react";
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

const API_KEY = "be1c284fc6564c83938100901242407";

const cityData = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
];

const validateCityName = async (cityName) => {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

const SearchScreen = ({ navigation }) => {
  const [cityName, setCityName] = useState("");
  const { addLocation } = useLocations();
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (text) => {
    setCityName(text);
    if (text) {
      const filtered = cityData.filter((city) =>
        city.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSuggestions(filtered);
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

      if (isValid) {
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
    backgroundColor: "#ddd",
    borderBottomWidth: 1,
    borderColor: "#bbb",
  },
  suggestionText: {
    fontSize: 18,
  },
  suggestionsList: {
    maxHeight: 150,  
  },
});

export default SearchScreen;
