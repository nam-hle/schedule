import { Chance } from "chance";

import { EmployeeInfo, Position, RegisteredEmployee, Registration, Shift, Time, Date, Location } from "./entities";
import { Random } from "./random";

const chance = new Chance();

export function generateId(): string {
  return Math.random().toString(36).substring(2, 5).toUpperCase();
}

export function generateEmployeeInfo(): EmployeeInfo {
  return {
    id: generateId(),
    name: chance.name(),
    level: Random.getInt(5),
    availablePositions: Random.getArrayItems(Position.VALUES, Random.getInt(3)),
  };
}

export function generateTime(): Time {
  return new Time(Random.getArrayItem(Date.VALUES), Random.getArrayItem(Shift.VALUES));
}

export function generateRegistration(): Registration {
  return {
    time: generateTime(),
    preferredLocation: Random.getArrayItems(Location.VALUES, Random.getInt(3)),
  };
}

export function generateRegisteredEmployee(): RegisteredEmployee {
  const registrations = Array.from({ length: Random.getInt(10) }, () => generateRegistration());
  const employeeInfo = generateEmployeeInfo();

  return new RegisteredEmployee(employeeInfo, registrations);
}

export function generateLocationInfo(): Location {
  const demands: Location.Demand[] = [];
  for (const shift of Shift.VALUES) {
    for (const position of Position.VALUES) {
      demands.push({ shift, position, quantity: Random.getInt(3) });
    }
  }
  return {
    kind: Random.getArrayItem(Location.VALUES),
    demands,
  };
}
