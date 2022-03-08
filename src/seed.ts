import { Chance } from "chance";

import { Random } from "./random";
import { EmployeeInfo, RegisteredEmployee, Registration } from "./types";
import { LOCATION_VALUES, LocationDemand, LocationInfo } from "./types/location";
import { POSITION_VALUES } from "./types/position";
import { DATE_VALUES, SHIFT_VALUES, Time } from "./types/time";

const chance = new Chance();

export function generateId(): string {
  return Math.random().toString(36).substring(2, 5).toUpperCase();
}

export function generateEmployeeInfo(): EmployeeInfo {
  return {
    id: generateId(),
    name: chance.name(),
    level: Random.getInt(5),
    availablePositions: Random.getArrayItems(POSITION_VALUES, Random.getInt(3)),
  };
}

export function generateTime(): Time {
  return new Time(Random.getArrayItem(DATE_VALUES), Random.getArrayItem(SHIFT_VALUES));
}

export function generateRegistration(): Registration {
  return {
    time: generateTime(),
    preferredLocation: Random.getArrayItems(LOCATION_VALUES, Random.getInt(3)),
  };
}

export function generateRegisteredEmployee(): RegisteredEmployee {
  const registrations = Array.from({ length: Random.getInt(10) }, () => generateRegistration());
  const employeeInfo = generateEmployeeInfo();

  return new RegisteredEmployee(employeeInfo, registrations);
}

export function generateLocationInfo(): LocationInfo {
  const demands: LocationDemand[] = [];
  for (const shift of SHIFT_VALUES) {
    for (const position of POSITION_VALUES) {
      demands.push({ shift, position, quantity: Random.getInt(3) });
    }
  }
  return {
    kind: Random.getArrayItem(LOCATION_VALUES),
    demands,
  };
}
