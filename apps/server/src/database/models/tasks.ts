import mongoose, { Schema, Document } from "mongoose";

interface ITask extends Document {
    id: number;
    type: "todo" | "progress" | "done";
    title: string;
    description: string;
}

const taskSchema = new Schema<ITask>({
    id: Number,
    type: { type: String, enum: ["todo", "progress", "done"] },
    title: String,
    description: String,
});

export default mongoose.model<ITask>("Task", taskSchema);
