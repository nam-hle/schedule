import { table } from "table";
import { getBorderCharacters } from "table/dist/src/getBorderCharacters";

import { Random } from "../random";

import { Location, LocationKind } from "./location";
import { Position } from "./position";
import { Time } from "./time";
import { TimePosition } from "./time-position";

export interface EmployeeInfo {
  readonly id: string;
  readonly name: string;
  readonly level: number;
  readonly positions: Position[];
}

export interface Registration {
  readonly time: Time;
  readonly preferredLocations: LocationKind[];
}

export interface LocationAssignment extends TimePosition {
  readonly location: Location;
}

export namespace LocationAssignment {
  export function isMatched(assignment: LocationAssignment, timePosition: TimePosition): boolean {
    return TimePosition.isEqual(assignment, timePosition);
  }
}

export class Employee {
  private readonly registrations: Registration[] = [];
  private readonly assignments: LocationAssignment[] = [];

  constructor(private info: EmployeeInfo) {}

  isEqual(other: Employee): boolean {
    return this.info.id === other.info.id;
  }

  link(location: Location, timePosition: TimePosition): void {
    const assignment = this.assignments.find(a => LocationAssignment.isMatched(a, timePosition));
    if (assignment) {
      throw new Error("Assignment already exists");
    }

    this.assignments.push({ ...timePosition, location });
  }

  unlink(timePosition: TimePosition): void {
    const index = this.assignments.findIndex(a => LocationAssignment.isMatched(a, timePosition));
    if (index === -1) {
      throw new Error("Assignment not found");
    }

    this.assignments.splice(index, 1);
  }

  register(registration: Registration): void {
    this.registrations.push(registration);
  }

  isAvailable(timePosition: TimePosition): boolean {
    const { time, position } = timePosition;

    return this.isAvailableAtTime(time) && this.isAvailableAtPosition(position);
  }

  print(): void {
    console.log(
      table(
        [
          ["Id", this.info.id],
          ["Name", this.info.name],
          ["Level", this.info.level],
          ["Positions", this.info.positions.join(", ")],
          ["Registrations", this.registrations.map(r => `${r.time} ${r.preferredLocations.join(", ")}`).join("\n")],
        ],
        { border: getBorderCharacters("norc") }
      )
    );
  }

  private isAvailableAtTime(time: Time): boolean {
    return this.registrations.some(r => r.time.isEqual(time));
  }

  private isAvailableAtPosition(position: Position): boolean {
    return this.info.positions.includes(position);
  }

  static seed(): Employee {
    const employee = new Employee({
      id: Random.id(),
      name: Random.name(),
      level: Random.int(5),
      positions: Random.uniqueItems(Position.VALUES, Random.int(1, 3)),
    });

    for (let i = 0; i < Random.int(3, 7); i++) {
      employee.register({
        time: Time.seed(),
        preferredLocations: Random.uniqueItems(Location.VALUES, Random.int(3)),
      });
    }

    return employee;
  }
}
