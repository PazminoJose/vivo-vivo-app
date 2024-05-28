import { z } from "zod";

export const zoneSchema = z.object({
  zoneID: z.number().optional(),
  zoneName: z.string().min(5, "El nombre de la zona es muy corto"),
  zoneColor: z.string(),
  polygon: z.array(z.array(z.number()).length(2, "No es una zona válida")),
  state: z.number().optional()
});

export type ZoneSchema = z.infer<typeof zoneSchema>;

export const zoneInitialValues: ZoneSchema = {
  zoneName: "",
  zoneColor: "#000000",
  polygon: []
};
