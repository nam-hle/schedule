import { Location } from "./entities";
import { generateLocationInfo } from "./seed";

for (let i = 0; i < 10; i++) {
  const e = generateLocationInfo();
  console.log(Location.toString(e));
}
