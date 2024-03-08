import { PersonDisability } from "./person-disability";
import { PersonInfo } from "./person-info.model";

export interface Person {
  personID: number;
  firstName: string;
  middleName: string;
  lastNames: string;
  dni: string;
  avatar: string;
  personDisability: PersonDisability[];
  personInfo: PersonInfo;
}
