import express, { Request, Response } from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import EnvironmentConfig from './types/EnvironmentConfig';
import getBlogPostsController from './controllers/getBlogPostsController';
import { PORT } from './constants/Port';

// Load all environment variables from config.
config();

// Initialize express for communications with the server.
const app = express();
app.use(cors({
    origin: '*',
}));
app.use(express.json());

// Endpoints:
app.get('/', (request: Request, response: Response): void => {
    response.send("Hello world");
});
app.get('/blog/:page', getBlogPostsController);

// Connect to the database.
const envConfig = new EnvironmentConfig(process.env);
const database = mongoose.connect(envConfig.mongoURL).then((): void => {
    app.listen(PORT);
    console.log('Listening on port: ' + PORT);
});
