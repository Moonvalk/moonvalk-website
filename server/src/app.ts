import express from 'express';
import path from 'path';
import cors from 'cors';
import { EnvironmentProps } from './util/EnvironmentProps';
import cookieParser from 'cookie-parser';
import { connectToDatabase } from './util/Database';
import { createUserController } from './controllers/user/createUserController';
import { loginUserController } from './controllers/user/loginUserController';
import { getChangelogsController } from './controllers/changelogs/getChangelogsController';
import { createChangelogController } from './controllers/changelogs/createChangelogController';
import { getPageController } from './controllers/getPageController';
import { getUserProfileController } from './controllers/user/getUserProfileController';
import { logoutUserController } from './controllers/user/logoutUserController';
import { createNewPostController } from './controllers/posts/createNewPostController';
import { editPostController } from './controllers/posts/editPostController';
import { getPostController } from './controllers/posts/getPostController';
import { getPostsController } from './controllers/posts/getPostsController';
import { authenticateUserController } from './controllers/user/authenticateUserController';
import { deleteChangelogController } from './controllers/changelogs/deleteChangelogController';
import { authorizeAdminController } from './controllers/user/authorizeUserController';
import { sendContactMessageController } from './controllers/sendContactMessageController';
import { createUploadController } from './controllers/uploads/createUploadController';
import { getUploadController } from './controllers/uploads/getUploadController';
import { getUploadsController } from './controllers/uploads/getUploadsController';
import { imageUploader } from './util/ImageUploader';
import { deletePostController } from './controllers/posts/deletePostController';
import { deleteUploadController } from './controllers/uploads/deleteUploadController';

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
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads/')));

// Attempt connection to the database.
connectToDatabase();

// Declare all endpoint controllers.
// User account controllers.
app.post('/api/register', createUserController);
app.post('/api/login', loginUserController);
app.get('/api/profile', authenticateUserController, getUserProfileController);
app.post('/api/logout', logoutUserController);

// Changelog controllers.
app.get('/api/changelogs', getChangelogsController);
app.post('/api/changelog', authorizeAdminController, createChangelogController);
app.delete('/api/changelog/delete', authorizeAdminController, deleteChangelogController);

// News post controllers.
app.post('/api/post', authorizeAdminController, createNewPostController);
app.put('/api/post/edit', authorizeAdminController, editPostController);
app.delete('/api/post/delete', authorizeAdminController, deletePostController);
app.get('/api/posts', getPostsController);
app.get('/api/post/:id', getPostController);

// Image upload controllers
app.get('/api/upload/:id', getUploadController);
app.get('/api/uploads', getUploadsController);
app.post('/api/upload', authorizeAdminController, imageUploader.single('file'), createUploadController);
app.delete('/api/upload/delete', authorizeAdminController, deleteUploadController);

// Contact controllers.
app.post('/api/contact/sendMessage', sendContactMessageController);

// Set up wildcard controller for returning React pages.
app.get('/*', getPageController);

// Listen for requests.
app.listen(env.port, async () => {
    console.log('Server started on port: ' + env.port);
});
