import { Disability } from "./disability.model";

export interface PersonDisability {
  personDisabilityID: number;
  personID: number;
  disability: Disability;
  percentage: number;
}
