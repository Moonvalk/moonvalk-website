import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import { EnvironmentProps } from './util/EnvironmentProps';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import { connectToDatabase } from './util/Database';
import { createUserController } from './controllers/user/createUserController';
import { loginUserController } from './controllers/user/loginUserController';
import { getChangelogsController } from './controllers/getChangelogsController';
import { createChangelogController } from './controllers/createChangelogController';
import { getPageController } from './controllers/getPageController';
import { getUserProfileController } from './controllers/user/getUserProfileController';
import { logoutUserController } from './controllers/user/logoutUserController';
import { createNewPostController } from './controllers/posts/createNewPostController';
import { editPostController } from './controllers/posts/editPostController';
import { getPostController } from './controllers/posts/getPostController';
import { getPostsController } from './controllers/posts/getPostsController';
import { authenticateUserController } from './controllers/user/authenticateUserController';

// Load environment variables & initialize Express for communications with the server.
const env = EnvironmentProps.config;
const app = express();
const uploadMiddleware = multer({ dest: '../uploads/' });

// Set up Express middleware.
app.use(cors({
    credentials: true,
    origin: env.host + env.port,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../public/')));
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads/')));

// Attempt connection to the database.
connectToDatabase();

// Declare all endpoint controllers.
app.post('/api/register', createUserController);
app.post('/api/login', loginUserController);
app.get('/api/profile', authenticateUserController, getUserProfileController);
app.post('/api/logout', logoutUserController);
app.get('/api/changelogs', getChangelogsController);
app.post('/api/changelog', authenticateUserController, createChangelogController);
app.post('/api/post', authenticateUserController, uploadMiddleware.single('file'), createNewPostController);
app.put('/api/post', authenticateUserController, uploadMiddleware.single('file'), editPostController);
app.get('/api/posts', getPostsController);
app.get('/api/post/:id', getPostController);

// Set up wildcard controller for returning React pages.
app.get('/*', getPageController);

// Listen for requests.
app.listen(env.port, async () => {
    console.log('Server started on port: ' + env.port);
});
