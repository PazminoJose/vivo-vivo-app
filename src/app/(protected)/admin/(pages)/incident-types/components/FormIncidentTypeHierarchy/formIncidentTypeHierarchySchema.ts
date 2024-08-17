import { z } from "zod";

export const incidentTypeHierarchySchema = z.object({
  incidentTypeHierarchyID: z.number().optional(),
  incidentTypeHierarchyName: z.string().min(3, "El nombre de la jerarquía es muy corto"),
  state: z.enum(["0", "1"], { message: "EL estado es obligatorio" }).transform(Number)
});

export type IncidentTypeHierarchySchema = z.infer<typeof incidentTypeHierarchySchema>;

export const incidentTypeInitialHierarchyValues: IncidentTypeHierarchySchema = {
  incidentTypeHierarchyName: "",
  state: -1
};
