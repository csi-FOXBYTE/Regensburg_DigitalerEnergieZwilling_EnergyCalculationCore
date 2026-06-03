import { z } from "zod";
import { RangeKeySchema } from "../range-bands.js";

export const DETOuterWallInputSchema = z.object({
  area: z.number(),
  adjacentWallArea: z.number().nullable().optional(),
  year: z.union([z.number(), RangeKeySchema]).nullable().optional(),
  hasInsulation: z.boolean().nullable().optional(),
  constructionType: z.string().nullable().optional(),
  insulationThickness: z.number().nullable().optional(),
  uValue: z.number().nullable().optional(),
});

export type DETOuterWallInput = z.infer<typeof DETOuterWallInputSchema>;
