import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectToDatabase } from "./database";
import { logger } from "./utils";
import { registerRoutes } from "./routes";

// Create express app
const app = express();

// Some required middlwares
app.use(cors());
app.use(express.json());

// Register routes
registerRoutes(app);

// Load environment variables in (process.env)
config();

// Define listen port from environment variable
const LISTEN_PORT = parseInt(process.env.LISTEN_PORT || "3000");

// Listen on port
app.listen(LISTEN_PORT, () => {
    logger.info(`Server is running on port ${LISTEN_PORT}`);
});

connectToDatabase();
