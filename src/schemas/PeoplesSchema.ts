import { z } from "zod";

export const peoplesSchema = z.object({
  searchTerm: z.string().min(1, "Search input is required"),
  selectedPeople: z
    .array(z.string())
    .min(1, "At least one person must be selected"),
});
