import {z} from "zod";

export const userRegistrationSchema = z.object({
    lName: z.string().min(7).max(20),
    lMail: z.string().email(),
    lPassword: z.string().min(8),
    teamName: z.string().min(7).max(20)
});

export const userLoginSchema = z.object({
    username: z.string().min(7).max(20),
    password: z.string().min(8),
});

export const memberRegistrationSchema = z.object({
    username: z.string().min(7).max(20),
    email: z.string().email()
});
