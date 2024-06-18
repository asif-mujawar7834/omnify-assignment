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

// export const FilterSchema = z.object({
//   startDate: z.date({ required_error: "Start Date Required" }).optional(),
//   endDate: z.date({ required_error: "End Date Required" }).optional(),
//   searchTerm: z.string().min(1, "Search input is required").optional(),
//   selectedPeople: z
//     .array(z.string())
//     .min(1, "At least one person must be selected")
//     .optional(),
//   serviceSearchTerm: z.string().min(1, "Search Input is Required"),
//   selectedServices: z
//     .array(z.string())
//     .min(1, "At least one person must be selected"),
// });

// export const FilterSchema = z
//   .object({
//     startDate: z.date({ required_error: "Start Date Required" }).optional(),
//     endDate: z.date({ required_error: "End Date Required" }).optional(),
//     searchTerm: z.string().min(1, "Search input is required").optional(),
//     selectedPeople: z
//       .array(z.string())
//       .min(1, "At least one person must be selected")
//       .optional(),
//     serviceSearchTerm: z.string().min(1, "Search Input is Required").optional(),
//     selectedServices: z
//       .array(z.string())
//       .min(1, "At least one person must be selected")
//       .optional(),
//   })
//   .superRefine((data, ctx) => {
//     const hasDateRange = data.startDate && data.endDate;
//     const hasSearchAndPeople =
//       data.searchTerm && data.selectedPeople && data.selectedPeople.length > 0;
//     const hasServiceSearchAndServices =
//       data.serviceSearchTerm &&
//       data.selectedServices &&
//       data.selectedServices.length > 0;

//     if (data.startDate && !data.endDate) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "End Date is required if Start Date is provided.",
//         path: ["endDate"],
//       });
//     }

//     if (!data.startDate && data.endDate) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Start Date is required if End Date is provided.",
//         path: ["startDate"],
//       });
//     }

//     if (
//       data.searchTerm &&
//       (!data.selectedPeople || data.selectedPeople.length === 0)
//     ) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message:
//           "At least one person must be selected if Search Term is provided.",
//         path: ["selectedPeople"],
//       });
//     }

//     if (
//       !data.searchTerm &&
//       data.selectedPeople &&
//       data.selectedPeople.length > 0
//     ) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Search Term is required if Selected People is provided.",
//         path: ["searchTerm"],
//       });
//     }

//     if (
//       data.serviceSearchTerm &&
//       (!data.selectedServices || data.selectedServices.length === 0)
//     ) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message:
//           "At least one service must be selected if Service Search Term is provided.",
//         path: ["selectedServices"],
//       });
//     }

//     if (
//       !data.serviceSearchTerm &&
//       data.selectedServices &&
//       data.selectedServices.length > 0
//     ) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message:
//           "Service Search Term is required if Selected Services is provided.",
//         path: ["serviceSearchTerm"],
//       });
//     }

//     if (!hasDateRange && !hasSearchAndPeople && !hasServiceSearchAndServices) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message:
//           "Either startDate and endDate, or searchTerm and selectedPeople, or serviceSearchTerm and selectedServices must be provided.",
//         path: [],
//       });
//     }
//   });
