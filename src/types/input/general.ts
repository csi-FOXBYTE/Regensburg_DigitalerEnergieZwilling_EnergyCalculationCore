import { z } from "zod";
import { BuildingTypeSchema } from "../building-type.js";
import { RangeKeySchema } from "../range-bands.js";

export const DETGeneralInputSchema = z.object({
  buildingYear: z.union([z.number(), RangeKeySchema]),
  numberOfStories: z.number().nullable().optional(),
  buildingHeight: z.number(),
  buildingBaseArea: z.number(),
  livingArea: z.number().nullable().optional(),
  type: BuildingTypeSchema,
});

export type DETGeneralInput = z.infer<typeof DETGeneralInputSchema>;
