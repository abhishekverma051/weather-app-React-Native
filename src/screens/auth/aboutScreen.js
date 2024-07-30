import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const AboutPage = () => {
  const img = require("/Users/tanmaygirdhar/ReactNative/WeatherApp/src/img/weather-icon-with-sun-and-cloud-on-transparent-background-free-png.webp");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={img}
        style={styles.logo}
      />
      <Text style={styles.title}>About WeatherApp</Text>
      <Text style={styles.description}>
        WeatherApp provides accurate and real-time weather updates to help you
        plan your day. Our goal is to deliver reliable weather forecasts and
        insights in a user-friendly manner.
      </Text>

      <Text style={styles.sectionTitle}>Developer</Text>
      <Text style={styles.developer}>Abhishek Verma</Text>

      <Text style={styles.sectionTitle}>Follow Us</Text>
      <View style={styles.socialLinks}>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://facebook.com/weatherapp")}
        >
          <Text style={styles.link}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://twitter.com/weatherapp")}
        >
          <Text style={styles.link}>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://instagram.com/weatherapp")}
        >
          <Text style={styles.link}>Instagram</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Contact Us</Text>
      <Text style={styles.contact}>support@weatherapp.com</Text>

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "rgb(40, 55, 50)",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "white",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 24,
    color: "white",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    color: "white",
  },
  developer: {
    fontSize: 16,
    marginBottom: 5,
    color: "white",
  },
  socialLinks: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    color: "white",
  },
  link: {
    fontSize: 16,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  contact: {
    fontSize: 16,
    marginBottom: 20,
    color: "white",
  },
  version: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    color: "white",
  },
});

export default AboutPage;
