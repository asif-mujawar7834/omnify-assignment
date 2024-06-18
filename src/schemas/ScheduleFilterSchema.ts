import { z } from "zod";

export const ScheduleFilterSchema = z.object({
  filterType: z.enum(["scheduleDate", "peoples", "services"]),
  startDate: z.date({ required_error: "Start Date Required" }),
  endDate: z.date({ required_error: "End Date Required" }),
});
