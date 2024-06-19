import { z } from "zod";

export const scheduleDateFilterSchema = z.object({
  startDate: z.date(), // Optional in this schema
  endDate: z.date(), // Optional in this schema
});

export const peopleFilterSchema = z.object({
  searchTerm: z
    .string({ required_error: "at least 2 alphabets required" })
    .min(1, "Search input is required"),
  selectedPeople: z
    .array(z.string(), {
      required_error:
        "Search And Select at least one person to apply this filter",
    })
    .min(1, "Search And Select at least one person to apply this filter"),
  startDate: z.date().optional(), // Optional in this schema
  endDate: z.date().optional(), // Optional in this schema
});

export const serviceFilterSchema = z.object({
  serviceSearchTerm: z
    .string({ required_error: "at least 2 alphabets required" })
    .min(1, "Search input is required"),
  selectedServices: z
    .array(z.string(), {
      required_error:
        "Search And Select at least one service to apply this filter",
    })
    .min(1, {
      message: "Search And Select at least one service to apply this filter",
    }),
  startDate: z.date().optional(), // Optional in this schema
  endDate: z.date().optional(), // Optional in this schema
});

export const FilterSchema = z.union([
  scheduleDateFilterSchema,
  peopleFilterSchema,
  serviceFilterSchema,
]);
