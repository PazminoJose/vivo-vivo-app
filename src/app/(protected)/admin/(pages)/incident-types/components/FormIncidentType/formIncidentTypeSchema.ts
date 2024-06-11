import { z } from "zod";

export const incidentTypeSchema = z.object({
  incidentTypeID: z.number().optional(),
  incidentTypeName: z.string().min(3, "El nombre del tipo de incidente es muy corto"),
  incidentTypeDesc: z.string().min(3, "La descripción del tipo de incidente es muy corta"),
  state: z.number()
});

export type IncidentTypeSchema = z.infer<typeof incidentTypeSchema>;

export const incidentTypeInitialValues: IncidentTypeSchema = {
  incidentTypeName: "",
  incidentTypeDesc: "",
  state: 1
};
