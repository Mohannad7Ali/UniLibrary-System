import { z } from "zod";
export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is required"),
  password: z.string().min(8),
});
export type signUpFormData = z.infer<typeof signUpSchema>;
// export const signInSchema = z.object({
//   email: z.email(),
//   password: z.string().min(8),
// });
export type signInFormData = z.infer<typeof signInSchema>;
import { object, string } from "zod";

export const signInSchema = object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
