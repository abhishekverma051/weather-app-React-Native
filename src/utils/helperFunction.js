import { getMyData } from "../screens/app";
import { setDataToAsyncStorage } from "./asyncStorage";

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
