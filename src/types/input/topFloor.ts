import { z } from "zod";
import { RangeKeySchema } from "../range-bands.js";

export const DETTopFloorInputSchema = z.object({
  area: z.number(),
  year: z.union([z.number(), RangeKeySchema]).nullable().optional(),
  isAtticHeated: z.boolean().nullable().optional(),
  topFloorType: z.string().nullable().optional(),
  hasInsulation: z.boolean().nullable().optional(),
  insulationThickness: z.number().nullable().optional(),
  hasAttic: z.boolean().nullable().optional(),
  uValue: z.number().nullable().optional(),
});

export type DETTopFloorInput = z.infer<typeof DETTopFloorInputSchema>;
