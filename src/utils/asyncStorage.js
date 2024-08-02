import AsyncStorage from "@react-native-async-storage/async-storage";
 
export const getDataFromAsyncStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("weatherData");
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (err) {
    console.log("Error retrieving data from AsyncStorage", err);
    return [];
  }
};

export const setDataToAsyncStorage = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem("weatherData", jsonValue);
  } catch (err) {
    console.log("Error saving data to AsyncStorage", err);
  }
};

export const removeDataFromAsyncStorage = async (location) => {
  try {
    const locationsData = await getDataFromAsyncStorage();
    const updatedData = locationsData.filter(
      (item) => item.location !== location
    );
    const jsonValue = JSON.stringify(updatedData);
    await AsyncStorage.setItem("weatherData", jsonValue);
  } catch (err) {
    console.log("Error removing data from AsyncStorage", err);
  }
};
