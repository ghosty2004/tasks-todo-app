import mongoose from "mongoose";
import { logger } from "@/utils";

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL!);
        logger.info("Connected to database");
    } catch (err) {
        logger.error(err);
    }
};
