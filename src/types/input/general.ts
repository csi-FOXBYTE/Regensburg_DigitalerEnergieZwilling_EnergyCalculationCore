import { z } from "zod";
import { BuildingTypeSchema } from "../building-type.js";
import { YearInputSchema } from "../range-bands.js";

export const DETGeneralInputSchema = z.object({
  buildingYear: YearInputSchema,
  numberOfStories: z.number().int().min(1).nullable().optional(),
  buildingHeight: z.number(),
  buildingBaseArea: z.number().positive(),
  livingArea: z.number().nullable().optional(),
  type: BuildingTypeSchema,
});

export type DETGeneralInput = z.infer<typeof DETGeneralInputSchema>;
