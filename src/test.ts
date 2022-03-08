import { generateLocationInfo, generateRegisteredEmployee } from "./seed";
import { LocationInfo } from "./types/location";

for (let i = 0; i < 10; i++) {
  const e = generateLocationInfo();
  console.log(LocationInfo.toString(e));
}
