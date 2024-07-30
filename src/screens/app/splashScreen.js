import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Easing,
  ActivityIndicator,
} from "react-native";

const img = require("/Users/tanmaygirdhar/ReactNative/WeatherApp/src/img/weather-icon-with-sun-and-cloud-on-transparent-background-free-png.webp");
const SplashScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      setLoading(false);
      navigation.replace("Weather");
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.logoContainer, opacity: fadeAnim }}>
        <Image source={img} style={styles.logo} />
      </Animated.View>
      {loading && (
        <ActivityIndicator
          size="large"
          color="#FFFFFF"
          style={styles.loadingIndicator}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(40, 55, 50)",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
  loadingIndicator: {
    position: "absolute",
    bottom: 50,
  },
});

export default SplashScreen;
