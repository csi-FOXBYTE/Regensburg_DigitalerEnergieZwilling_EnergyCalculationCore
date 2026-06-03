import { z } from "zod";
import { RangeKeySchema } from "../range-bands.js";
import { RoofInsulationTypeSchema } from "../roof-insulation-type.js";

export const DETRoofInputSchema = z.object({
  area: z.number(),
  year: z.union([z.number(), RangeKeySchema]).nullable().optional(),
  hasInsulation: z.boolean().nullable().optional(),
  insulationType: RoofInsulationTypeSchema.nullable().optional(),
  constructionType: z.string().nullable().optional(),
  insulationThickness: z.number().nullable().optional(),
  uValue: z.number().nullable().optional(),
});

export type DETRoofInput = z.infer<typeof DETRoofInputSchema>;
