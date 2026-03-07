import { z } from "zod";

export const messageSchema = z.object({
    content : z
    .string()
    .min(1, {message : "Message must be of atleast 1 character"})
    .max(300, {message : "Message must be of maximum 300 characters"})
});