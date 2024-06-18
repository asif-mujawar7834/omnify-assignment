// import { z } from "zod";

import { z } from "zod";

export const scheduleDateFilterSchema = z.object({
  startDate: z.date({ required_error: "Start Date Required" }),
  endDate: z.date({ required_error: "End Date Required" }),
});

export const peopleFilterSchema = z.object({
  searchTerm: z
    .string({ required_error: "atleast 2 alphabets required" })
    .min(1, "Search input is required"),
  selectedPeople: z
    .array(z.string(), {
      required_error:
        "Search And Select atleast one person to apply this filter",
    })
    .min(1, "Search And Select atleast one person to apply this filter"),
});

export const serviceFilterSchema = z.object({
  serviceSearchTerm: z
    .string({ required_error: "atleast 2 alphabets required" })
    .min(1, "Search input is required"),
  selectedServices: z
    .array(z.string(), {
      required_error:
        "Search And Select atleast one service to apply this filter",
    })
    .min(1, {
      message: "Search And Select at least one service to apply this filter",
    }),
});

export const FilterSchema = z.union([
  scheduleDateFilterSchema,
  peopleFilterSchema,
  serviceFilterSchema,
]);
