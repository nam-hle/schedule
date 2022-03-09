import { Chance } from "chance";

import { EmployeeInfo, Position, RegisteredEmployee, Registration, Shift, Time, Day, Location } from "./entities";
import { Random } from "./random";

export function generateId(): string {
  return Math.random().toString(36).substring(2, 5).toUpperCase();
}

export function generateEmployeeInfo(): EmployeeInfo {
  return {
    id: generateId(),
    name: chance.name(),
    level: Random.int(5),
    positions: Random.items(Position.VALUES, Random.int(3)),
  };
}

export function generateTime(): Time {
  return new Time(Random.item(Day.VALUES), Random.item(Shift.VALUES));
}

export function generateRegistration(): Registration {
  return {
    time: generateTime(),
    preferredLocations: Random.items(Location.VALUES, Random.int(3)),
  };
}

export function generateRegisteredEmployee(): RegisteredEmployee {
  const registrations = Array.from({ length: Random.int(10) }, () => generateRegistration());
  const employeeInfo = generateEmployeeInfo();

  return new RegisteredEmployee(employeeInfo, registrations);
}

export function generateLocationInfo(): Location {
  const demands: Location.Demand[] = [];
  for (const shift of Shift.VALUES) {
    for (const position of Position.VALUES) {
      demands.push({ shift, position, quantity: Random.int(3) });
    }
  }
  return {
    kind: Random.item(Location.VALUES),
    demands,
  };
}
