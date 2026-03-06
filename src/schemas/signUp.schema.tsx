import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(3, {message : "Username must be of atleast 3 characters"})
    .max(20, {message : "Username must be of maximum 20 characters"})
    .regex(/^[a-zA-Z0-9_]+$/, {message : "Username can only contain letters, numbers, and underscores"});

export const signUpSchema = z.object({
    username : usernameValidation,
    email : z.string().email({message : "Invalid email address"}),
    password : z.string().min(6, {message : "Password must be of atleast 6 characters"})
});