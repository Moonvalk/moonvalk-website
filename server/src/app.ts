import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import { EnvironmentProps } from './util/EnvironmentProps';
import cookieParser from 'cookie-parser';
import { connectToDatabase } from './util/Database';
import { createUserController } from './controllers/user/createUserController';
import { loginUserController } from './controllers/user/loginUserController';
import { getChangelogsController } from './controllers/getChangelogsController';
import { createChangelogController } from './controllers/createChangelogController';
import { getPageController } from './controllers/getPageController';

// Load environment variables & initialize Express for communications with the server.
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

// Attempt connection to the database.
connectToDatabase();

// Declare all endpoint controllers.
app.post('/register', createUserController);
app.post('/login', loginUserController);
app.get('/api/changelogs', getChangelogsController);
app.post('/api/changelog', createChangelogController);
app.get('/*', getPageController);

// Listen for requests.
app.listen(env.port, async () => {
    console.log('Server started on port: ' + env.port);
});
