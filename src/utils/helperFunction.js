import { getMyData } from "../screens/app";
import { setDataToAsyncStorage } from "./asyncStorage";
import * as Location from "expo-location";


export async function setData(location_name) {
  // get location data
  // verify location exists
  // set location data in asyn storage
  // return truthy value if data is correctly set
  const response = await getMyData(location_name);
  const location = response.location.name;
  const condition = response.current.condition.text;
  const temp = response.current.temp_c;
  setDataToAsyncStorage({ location, condition, temp });
}

 const fetchAddressFromCoordinates = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
    );

    console.log("OpenCage API Response:", response.data);

    if (
      response.data &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      return response.data.results[0].formatted;
    } else {
      console.error("No results found for the given coordinates.");
      return "Unknown location";
    }
  } catch (error) {
    console.error("Error fetching address:", error.message);
    return "Error fetching location";
  }
};


