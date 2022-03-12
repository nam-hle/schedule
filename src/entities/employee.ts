import { table } from "table";
import { getBorderCharacters } from "table/dist/src/getBorderCharacters";

import { Random } from "../random";

import { Assignment } from "./assignment";
import { Location } from "./location";
import { Position } from "./position";
import { Registration } from "./registration";
import { Time } from "./time";
import { TimePosition } from "./time-position";

export class Employee {
  private readonly registrations: Registration[] = [];
  private readonly assignments: Assignment[] = [];

  constructor(public readonly id: string, public readonly level: number, public readonly positions: Position[]) {}

  isEqual(other: Employee): boolean {
    return this.id === other.id;
  }

  link(assignment: Assignment): void {
    const index = this.getAssignmentIndex(assignment);
    if (index >= 0) {
      throw new Error("Assignment already exists");
    }

    if (assignment.employeeId !== this.id) {
      throw new Error("Assignment does not belong to this employee");
    }

    this.assignments.push(assignment);
  }

  unlink(assignment: Assignment): void {
    const index = this.getAssignmentIndex(assignment);
    if (index === -1) {
      throw new Error("Assignment not found");
    }

    this.assignments.splice(index, 1);
  }

  getAssignmentIndex(assignment: Assignment): number {
    return this.assignments.findIndex(a => Assignment.isEqual(a, assignment));
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
      ["Id", this.id],
      ["Level", this.level],
      ["Positions", this.positions.join(", ")],
    ]
      .map(([key, value]) => `${(key as string).padEnd(10, " ")}: ${value}`)
      .join("\n");
    const registrations = this.registrations.map(r => `${r.time} ${r.locationIds.join(", ")}`).join("\n");
    return table([[info, registrations]], { border: getBorderCharacters("norc") });
  }

  toJSON(): SerializedEmployee {
    return {
      id: this.id,
      level: this.level,
      positions: this.positions,
      registrations: this.registrations,
    };
  }

  static fromJSON(serialized: SerializedEmployee): Employee {
    const employee = new Employee(serialized.id, serialized.level, serialized.positions);

    employee.register(...serialized.registrations);

    return employee;
  }

  private isAvailableAtTime(time: Time): boolean {
    return this.registrations.some(r => r.time.isEqual(time));
  }

  private isAvailableAtPosition(position: Position): boolean {
    return this.positions.includes(position);
  }

  static seed(): Employee {
    const employee = new Employee(Random.id(), Random.int(1, 5), Random.uniqueItems(Position.VALUES, Random.int(1, 3)));

    Random.uniqueItems(Time.VALUES, Random.int(5, 10))
      .sort(Time.compare)
      .forEach(time =>
        employee.register({
          time,
          locationIds: Random.uniqueItems(Location.SEED_IDS, Random.int(1, 3)),
        })
      );

    return employee;
  }
}

export interface SerializedEmployee {
  readonly id: string;
  readonly level: number;
  readonly positions: Position[];
  readonly registrations: Registration[];
}
