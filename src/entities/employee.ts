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

  register(...registrations: Registration[]): void {
    this.registrations.push(...registrations);
  }

  isAvailable(timePosition: TimePosition): boolean {
    const { time, position } = timePosition;

    return this.isAvailableAtTime(time) && this.isAvailableAtPosition(position);
  }

  toString(): string {
    const info = [
      ["Id", this.info.id],
      ["Name", this.info.name],
      ["Level", this.info.level],
      ["Positions", this.info.positions.join(", ")],
    ]
      .map(([key, value]) => `${(key as string).padEnd(10, " ")}: ${value}`)
      .join("\n");
    const registrations = this.registrations.map(r => `${r.time} ${r.preferredLocations.join(", ")}`).join("\n");
    return table([[info, registrations]], { border: getBorderCharacters("norc") });
  }

  toJSON(): SerializedEmployee {
    return {
      id: this.info.id,
      name: this.info.name,
      level: this.info.level,
      positions: this.info.positions,
      registrations: this.registrations,
    };
  }

  static fromJSON(serialized: SerializedEmployee): Employee {
    const employee = new Employee({
      id: serialized.id,
      name: serialized.name,
      level: serialized.level,
      positions: serialized.positions,
    });

    employee.register(...serialized.registrations);

    return employee;
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
      level: Random.int(1, 5),
      positions: Random.uniqueItems(Position.VALUES, Random.int(1, 3)),
    });

    Random.uniqueItems(Time.VALUES, Random.int(5, 10))
      .sort(Time.compare)
      .forEach(time =>
        employee.register({
          time,
          preferredLocations: Random.uniqueItems(Location.VALUES, Random.int(1, 3)),
        })
      );

    return employee;
  }
}

export interface SerializedEmployee {
  readonly id: string;
  readonly name: string;
  readonly level: number;
  readonly positions: Position[];
  readonly registrations: Registration[];
}
