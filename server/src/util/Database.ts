import mongoose from "mongoose";
import { EnvironmentProps } from "./EnvironmentProps";

/**
 * Attempts to connect to the database.
 * @return {Promise<void>} void
 */
export async function connectToDatabase(): Promise<void> {
    // Connect to the database.
    try {
        console.log('Connecting to database at: ' + EnvironmentProps.mongooseURI);
        const response = await mongoose.connect(EnvironmentProps.mongooseURI);
    } catch (error_) {
        console.log(error_);
    }
}
