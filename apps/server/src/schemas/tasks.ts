import { z } from "zod";

export const createTaskSchema = z.object({
    type: z
        .enum(["todo", "progress", "done"], {
            message: 'Invalid task type. Must be "todo", "progress", or "done"',
        })
        .optional(),
    title: z
        .string({
            message: "Title must be a string",
        })
        .min(3, {
            message: "Title must be at least 3 characters long",
        })
        .max(15, {
            message: "Title must be at most 15 characters long",
        }),
    description: z
        .string({
            message: "Description must be a string",
        })
        .min(10, {
            message: "Description must be at least 10 characters long",
        })
        .max(100, {
            message: "Description must be at most 100 characters long",
        }),
});

export const updateTaskSchema = createTaskSchema.extend({}).partial();
