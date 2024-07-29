import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Profile = () => {
  const user = {
    avatar:
      "https://media.istockphoto.com/id/1388253782/photo/positive-successful-millennial-business-professional-man-head-shot-portrait.webp?s=2048x2048&w=is&k=20&c=0HU1oQGXlO4nrrMKKzAK4Jmu6XDLvXhTGjKScvrNIZw=",
    name: "User 1",
    email: "user.doe@example.com",
    bio: "loreum lipsim opisum noiism sorund",
  };

  return (
    <View style={styles.container}>
      <View style = {styles.innerContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgb(40, 55, 50)",
    
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  email: {
    fontSize: 18,
    color: "#666",
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    lineHeight: 22,
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(240, 255, 250, 0.7)",
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
  },
});

export default Profile;
