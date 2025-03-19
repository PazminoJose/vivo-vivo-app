import { z } from "zod";

export const vigilancePointSchema = z.object({
  vigilancePointID: z.number().optional(),
  vigilancePointName: z.string().min(1).max(255),
  zoneID: z.number().gte(0),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180)
});

export type VigilancePointSchema = z.infer<typeof vigilancePointSchema>;

export const vigilancePointInitialValues: VigilancePointSchema = {
  vigilancePointName: "",
  zoneID: 0,
  latitude: 0,
  longitude: 0
};
