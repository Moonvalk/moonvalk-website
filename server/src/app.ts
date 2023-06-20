import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import { EnvironmentProps } from './util/EnvironmentProps';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import Changelog from './models/Changelog';

// Load environment variables.
const env = EnvironmentProps.config;
const app = express();

// Set up Express middleware.
app.use(cors({
    credentials: true,
    origin: env.host + env.port,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../public/')));
app.use('./uploads', express.static(path.resolve(__dirname, '../uploads/')));

// Get changelogs.
app.get('/api/changelogs', async (request: Request, response: Response): Promise<void> => {
    const logs = await Changelog.find()
        .sort({createdAt: -1});
    response.json(logs);
});

app.post('/api/changelog', async (request: Request, response: Response): Promise<void> => {
    console.log(request.body);
    const newLog = new Changelog({
        version: request.body.version,
        date: request.body.date,
        summary: request.body.summary,
    });
    const createdLog = await newLog.save();
    response.json(createdLog);
});

// Wildcard for fetching React pages. Send back the index.html as a template.
app.get('/*', (request: Request, response: Response) => {
    response.sendFile(path.resolve(__dirname, '../public/index.html'));
    console.log('Sending new page update');
});


// Connect to the database.
try {
    console.log('Connecting to database at: ' + EnvironmentProps.mongooseURI);
    const response = await mongoose.connect(EnvironmentProps.mongooseURI);
} catch (error_) {
    console.log(error_);
}

// Listen for requests.
app.listen(env.port, () => {
    console.log('Server started on port: ' + env.port);
});
