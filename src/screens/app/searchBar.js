import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
} from "react-native";

const SearchScreen = ({ navigation }) => {
  const [cityName, setCityName] = useState("");

  const handleSearch = () => {
    if (cityName.trim()) {
      navigation.navigate("Weather", { cityName });
    } else {
      Alert.alert("Please enter a city name");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={cityName}
        onChangeText={setCityName}
      />
      <TouchableOpacity
        title="Search"
        onPress={handleSearch}
        style={styles.button}
      >
        <Text style={styles.text}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "black",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: "90%",
    borderRadius: 12,
    color: "Black",
    backgroundColor: "white",
  },
  button: {
    width: "30%",
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "condensedBold",
    padding: 10,
  },
});

export default SearchScreen;
