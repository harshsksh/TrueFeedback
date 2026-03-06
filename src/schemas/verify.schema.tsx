import { z } from "zod";

export const verifySchema = z.object({
    code : z.string().min(6, {message : "verification code must be of atleast 6 characters"})
});