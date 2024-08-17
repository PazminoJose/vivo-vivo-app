import { z } from "zod";

export const incidentTypeSchema = z.object({
  incidentTypeID: z.number().optional(),
  incidentTypeName: z.string().min(3, "El nombre del tipo de incidente es muy corto"),
  incidentTypeDesc: z.string().min(3, "La descripción del tipo de incidente es muy corta"),
  incidentTypeHierarchyID: z.number().gt(0, "La jerarquía es obligatoria"),
  state: z
    .number()
    .refine((value) => value === 0 || value === 1, { message: "EL estado es obligatorio" })
});

export type IncidentTypeSchema = z.infer<typeof incidentTypeSchema>;

export const incidentTypeInitialValues: IncidentTypeSchema = {
  incidentTypeName: "",
  incidentTypeDesc: "",
  incidentTypeHierarchyID: -1,
  state: 1
};
