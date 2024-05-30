import { Express } from "express";

import tasks from "./tasks";

export const registerRoutes = (app: Express) => {
    app.use("/tasks", tasks);
};
