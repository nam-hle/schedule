import { Assignment } from "./assignment";
import { Demand } from "./demand";
import { TimePosition } from "./time-position";

export class Location {
  static SEED_IDS = ["0", "1", "2"];
  static SEED_ID_SIZE = Location.SEED_IDS.length;

  private assignments: Assignment[] = [];

  constructor(public id: string, public demands: Demand[] = []) {}

  getAssignments(): Assignment[] {
    return this.assignments;
  }

  getTotalDemandAt(timePosition: TimePosition): number {
    return this.demands.find(demand => Demand.isEqual(demand, timePosition))?.quantity ?? 0;
  }

  getRemainDemandAt(timePosition: TimePosition): number {
    return this.getTotalDemandAt(timePosition) - this.getTotalAssignedAt(timePosition);
  }

  getTotalAssignedAt(timePosition: TimePosition): number {
    return this.getAssignmentsAt(timePosition).length ?? 0;
  }

  link(assignment: Assignment): void {
    const index = this.getAssignmentIndex(assignment);
    if (index !== -1) {
      throw new Error(`Assignment already linked to location ${this.id}`);
    }
    if (this.id !== assignment.locationId) {
      throw new Error(`Can not assign assignment to location ${this.id}`);
    }

    this.assignments.push(assignment);
  }

  unlink(assignment: Assignment): void {
    const index = this.getAssignmentIndex(assignment);
    if (index === -1) {
      throw new Error(`Assignment not linked to location ${this.id}`);
    }

    this.assignments.splice(index, 1);
  }

  getAssignmentIndex(assignment: Assignment): number {
    return this.assignments.findIndex(a => Assignment.isEqual(a, assignment));
  }

  private getAssignmentsAt(timePosition: TimePosition): Assignment[] {
    return this.assignments.filter(assignment => TimePosition.isEqual(assignment, timePosition));
  }

  toString(): string {
    return `${this.id}(${this.demands.map(Demand.toString).join(", ")})`;
  }

  isEqual(other: Location): boolean {
    return this.id === other.id;
  }
}
