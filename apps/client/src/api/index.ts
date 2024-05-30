import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT_URL;

// CREATE
export const creatTask = async (
    taskPayload: ICreateTaskPayload
): Promise<ITask> => {
    const task = await axios.post("/tasks", taskPayload);
    return task.data;
};

// READ
export const getTasks = async (): Promise<ITask[]> => {
    const tasks = await axios.get("/tasks");
    return tasks.data;
};

// UPDATE
export const updateTask = async (
    taskId: number,
    taskPayload: IUpdateTaskPayload
): Promise<ITask> => {
    const task = await axios.put(`/tasks/${taskId}`, taskPayload);
    return task.data;
};

// DELETE
export const deleteTask = async (taskId: number) => {
    await axios.delete(`/tasks/${taskId}`);
};

// Some interfaces for type-safety
export interface ITask {
    id: number;
    type: "todo" | "progress" | "done";
    title: string;
    description: string;
}

interface ICreateTaskPayload {
    type?: "todo" | "progress" | "done";
    title: string;
    description: string;
}

interface IUpdateTaskPayload {
    type?: "todo" | "progress" | "done";
    title?: string;
    description?: string;
}
