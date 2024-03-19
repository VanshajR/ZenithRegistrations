import { z } from 'zod';
import { userRegistrationSchema } from './user.schema.js';

export const teamSchema = z.object({
    name: z.string().min(7),
    leader: userRegistrationSchema.pick({username: true}),
    members: z.array(userRegistrationSchema.pick({username: true})),
});