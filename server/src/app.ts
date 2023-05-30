import express from 'express';
import cors from 'cors';
import { EnvironmentProps } from './util/EnvironmentProps.js';
import cookieParser from 'cookie-parser';
import { getDirName } from './util/FileDirName.js';
import mongoose from 'mongoose';

// Load environment variables.
const env = EnvironmentProps.config;
const app = express();

const localhost = 'http://localhost:';
app.use(cors({
    credentials: true,
    origin: localhost + env.localPort,
}));
app.use(express.json());
app.use(cookieParser());
app.use('./uploads', express.static(getDirName() + '/uploads'));

// Connect to the database.
try {
    console.log('Connecting to database at: ' + EnvironmentProps.mongooseURI);
    const response = await mongoose.connect(EnvironmentProps.mongooseURI);
} catch (error) {
    console.log(error);
}

// Listen for requests.
app.listen(env.serverPort, () => {
    console.log(`Listening on port ${env.serverPort}`);
});
