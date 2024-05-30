import mongoose, { Schema, Document } from "mongoose";

interface ITask extends Document {
    id: number;
    type: "todo" | "progress" | "done";
    title: string;
    description: string;
}

const taskSchema = new Schema<ITask>({
    type: { type: String, enum: ["todo", "progress", "done"] },
    title: String,
    description: String,
});

taskSchema.virtual("id").get(function () {
    return this._id;
});

taskSchema.set("toJSON", {
    virtuals: true,
});

export default mongoose.model<ITask>("Task", taskSchema);
