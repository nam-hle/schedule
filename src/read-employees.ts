import * as Fs from "fs/promises";

import { Employee, SerializedEmployee } from "./entities";

async function main(): Promise<void> {
  const content = await Fs.readFile("src/employees.txt", "utf-8");

  (JSON.parse(content) as SerializedEmployee[]).forEach(e => console.log(Employee.fromJSON(e).toString()));
}

main();
