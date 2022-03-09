import { Random } from "../random";
import { generateId } from "../seed";

import { Location } from "./location";
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
  readonly preferredLocations: Location[];
}

export class RegisteredEmployee {
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
    console.log(`
Id: ${this.info.id}
Name: ${this.info.name}
Level: ${this.info.level}
Available Positions: ${this.info.positions.join(", ")}
Registrations: \n${this.registrations.map(r => `\t - ${r.time} at ${r.preferredLocations.join(", ")}`).join("\n")}`);
  }

  private isAvailableAtTime(time: Time): boolean {
    return this.registrations.some(r => r.time.isEqual(time));
  }

  private isAvailableAtPosition(position: Position): boolean {
    return this.info.positions.includes(position);
  }

  static seed(): RegisteredEmployee {
    const employee = new RegisteredEmployee({
      id: generateId(),
      name: Random.name(),
      level: Random.int(5),
      positions: Random.items(Position.VALUES, Random.int(3)),
    });
    for (let i = 0; i < Random.int(5); i++) {
      employee.register({
        time: Time.seed(),
        preferredLocations: Random.items(Location.VALUES, Random.int(3)),
      });
    }
  }
}
