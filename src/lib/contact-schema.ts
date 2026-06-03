import { z } from "zod";

/**
 * Shared validation for the contact / enquiry form — used by both the client
 * form (react-hook-form) and the /api/contact route, so they never drift.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  organisation: z.string().trim().min(2, "Please enter your organisation"),
  designation: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email"),
  message: z.string().trim().min(10, "Please add a short message (10+ characters)"),
  /** Which CTA opened the form — included in the email so we know the context. */
  source: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
