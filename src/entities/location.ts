import { Demand } from "./demand";
import { Employee } from "./employee";
import { TimePosition } from "./time-position";

export enum LocationKind {
  CTVT = "CTVT",
  LHP = "LHP",
  PCT = "PCT",
}

export interface EmployeeAssignment extends TimePosition {
  readonly employees: Employee[];
}
export namespace EmployeeAssignment {
  export function isMatched(assignment: EmployeeAssignment, timePosition: TimePosition): boolean {
    return TimePosition.isEqual(assignment, timePosition);
  }
}

export class Location {
  static VALUES = Object.values(LocationKind);
  static SIZE = Location.VALUES.length;

  private assignments: EmployeeAssignment[] = [];

  constructor(public kind: LocationKind, public demands: Demand[] = []) {}

  getAssignments(): EmployeeAssignment[] {
    return this.assignments;
  }

  getTotalDemand(timePosition: TimePosition): number {
    return this.demands.find(demand => Demand.isEqual(demand, timePosition))?.quantity ?? 0;
  }

  getRemainDemand(timePosition: TimePosition): number {
    return this.getTotalDemand(timePosition) - this.getTotalAssigned(timePosition);
  }

  getTotalAssigned(timePosition: TimePosition): number {
    return this.findAssignment(timePosition)?.employees.length ?? 0;
  }

  link(employee: Employee, timePosition: TimePosition): void {
    let assignment = this.findAssignment(timePosition);
    if (assignment === undefined) {
      assignment = { ...timePosition, employees: [] };
      this.assignments.push(assignment);
    }

    if (assignment.employees.find(e => e.isEqual(employee))) {
      throw new Error("Employee is already assigned");
    }

    this.assignments.push(assignment);
  }

  unlink(employee: Employee, timePosition: TimePosition): void {
    let assignment = this.findAssignment(timePosition);
    if (assignment === undefined) {
      throw new Error("Assignment not found");
    }

    const employeeIndex = assignment.employees.findIndex(e => e.isEqual(employee));
    if (employeeIndex === -1) {
      throw new Error("Employee is not assigned");
    }

    assignment.employees.splice(employeeIndex, 1);
  }

  private findAssignment(timePosition: TimePosition): EmployeeAssignment | undefined {
    return this.assignments.find(assignment => EmployeeAssignment.isMatched(assignment, timePosition));
  }

  toString(): string {
    return `${this.kind}(${this.demands.map(Demand.toString).join(", ")})`;
  }

  isEqual(other: Location): boolean {
    return this.kind === other.kind;
  }
}
