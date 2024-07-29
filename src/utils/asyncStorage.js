import AsyncStorage from "@react-native-async-storage/async-storage";

async function getDataFromAsyncStorage() {
  try {
    const jsonValue = await AsyncStorage.getItem("weatherData");
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (err) {
    console.log("Error retrieving data from AsyncStorage", err);
    return [];
  }
}

async function setDataToAsyncStorage(data) {
  const { location, temp, condition } = data;

  // get locations data from async storage
  const locationsData = await getDataFromAsyncStorage();
  // append data in locations array
  locationsData.push({ location, temp, condition });

  // set data in async storage
  try {
    const jsonValue = JSON.stringify(locationsData);
    await AsyncStorage.setItem("weatherData", jsonValue);
  } catch (err) {
    console.log("Error saving data to AsyncStorage", err);
  }
}


async function removeDataFromAsyncStorage(location) {
  try {
    // get locations data from async storage
    const locationData = await getDataFromAsyncStorage();

    // filter out the data having the specified location
    const updatedData = locationData.filter(
      (item) => item.location !== location
    );

    // set the updated data back to async storage
    const jsonValue = JSON.stringify(updatedData);
    await AsyncStorage.setItem("weatherData", jsonValue);

    console.log(`Removed data for location: ${location}`);
  } catch (err) {
    console.log("Error removing data from AsyncStorage", err);
  }
}

export {
  getDataFromAsyncStorage,
  setDataToAsyncStorage,
  removeDataFromAsyncStorage,
};
