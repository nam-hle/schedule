import { table } from "table";
import { getBorderCharacters } from "table/dist/src/getBorderCharacters";

import { Random } from "../random";

import { Location, LocationKind } from "./location";
import { Position } from "./position";
import { Time } from "./time";

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

export class Employee {
  private readonly registrations: Registration[] = [];
  constructor(private info: EmployeeInfo) {}

  public register(registration: Registration): void {
    this.registrations.push(registration);
  }

  public isAvailable(params: { time: Time; position?: Position }): boolean {
    const { time, position } = params;
    return this.isAvailableAtTime(time) && (!position || this.isAvailableAtPosition(position));
  }

  public print(): void {
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
