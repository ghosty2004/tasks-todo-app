import { Router } from "express";
import { ZodError } from "zod";
import { Error } from "mongoose";
import { createTaskSchema, updateTaskSchema } from "@/schemas";
import { logger } from "@/utils";
import tasks from "@/database/models/tasks";

const router = Router();

// CREATE
router.post("/", async (req, res) => {
    try {
        const data = createTaskSchema.parse(req.body);
        const type = data.type || "todo";
        const task = new tasks({ type, ...data });
        const savedTask = await task.save();
        res.send(savedTask);
    } catch (err) {
        if (err instanceof ZodError) {
            res.status(400).send(err.errors[0].message);
            return;
        }

        res.status(500).send("Internal server error");
        logger.error(err);
    }
});

// READ
router.get("/", async (_req, res) => {
    try {
        const result = await tasks.find();
        res.send(result);
    } catch (err) {
        res.status(500).send("Internal server error");
        logger.error(err);
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const data = updateTaskSchema.parse(req.body);
        const result = await tasks.findByIdAndUpdate(req.params.id, data, {
            new: true,
        });
        res.send(result);
    } catch (err) {
        if (err instanceof ZodError) {
            res.status(400).send(err.errors[0].message);
            return;
        }

        if (err instanceof Error.CastError) {
            res.status(400).send("Invalid ID");
            return;
        }

        res.status(500).send("Internal server error");
        logger.error(err);
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const result = await tasks.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (err) {
        if (err instanceof Error.CastError) {
            res.status(400).send("Invalid ID");
            return;
        }

        res.status(500).send("Internal server error");
        logger.error(err);
    }
});

export default router;
