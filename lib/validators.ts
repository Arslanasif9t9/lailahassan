import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  projectType: z.string().min(1, "Select a project type"),
  budget: z.string().min(1, "Select a budget"),
  deadline: z.string().optional().default(""),
  details: z.string().min(10, "Tell us a little more about your project"),
});

export type ContactInput = z.infer<typeof contactSchema>;
