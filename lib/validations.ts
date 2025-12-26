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
import { object } from "zod";

export const signInSchema = object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
export const bookSchema = z.object({
  title: z.string().min(3).max(100).trim(),
  description: z.string().min(10).max(1000).trim(),
  author: z.string().min(3).max(100).trim(),
  genre: z.string().min(3).max(100).trim(),
  coverUrl: z.string().nonempty(),
  videoUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i),
  rating: z.coerce.number().min(1).max(5),
  totalCopies: z.coerce.number().int().positive().lte(10000),
  summary: z.string().trim().min(10),
});
