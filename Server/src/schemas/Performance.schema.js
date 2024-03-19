import { z } from 'zod';
import { teamSchema } from './team.schema.js';

export const performanceSchema = z.object({
    team: teamSchema.pick({ name: true }),
    score: z.number().default(0),
    answers: z.array(
        z.object({
            question: z.string(),
            answer: z.string(),
            isCorrect: z.boolean().default(false),
        })
    ),
});