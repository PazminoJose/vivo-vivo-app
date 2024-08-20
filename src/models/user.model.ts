import { Person } from "./person.model";
import { Role } from "./role.model";

export interface User {
  userID: number;
  email: string;
  isAcceptedTerms: number;
  state: number;
  person: Person;
  userRole: Record<"role", Role>[];
}
