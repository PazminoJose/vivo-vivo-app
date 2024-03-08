import { Ethnic } from "./ethnic.model";
import { Gender } from "./gender.model";
import { MaritalStatus } from "./marital-status.model";

export interface PersonInfo {
  personInfoID: number;
  phone: string;
  birthDate: string;
  address: string;
  person: number;
  ethnic: Ethnic;
  gender: Gender;
  maritalStatus: MaritalStatus;
}
