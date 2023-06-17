// import express, { Request, Response } from "express";
// import path from 'path';
// import cors from 'cors';
// import { EnvironmentProps } from './util/EnvironmentProps';
// import cookieParser from 'cookie-parser';
// import { getDirName } from './util/FileDirName';
// import mongoose from 'mongoose';

// // Load environment variables.
// // const env = EnvironmentProps.config;
// // const app = express();

// // const localhost = 'http://localhost:';
// // app.use(cors({
// //     credentials: true,
// //     origin: localhost + env.localPort,
// // }));
// // app.use(express.json());
// // app.use(cookieParser());
// // app.use('./uploads', express.static(getDirName() + '/uploads'));

// // app.get('*', (request: Request, response: Response) => {
// //     console.log('sending index.html');
// //     response.sendFile(path.resolve('client', 'build', '../../../client/dist/index.html'));
// // });

// // // Connect to the database.
// // // try {
// // //     console.log('Connecting to database at: ' + EnvironmentProps.mongooseURI);
// // //     const response = await mongoose.connect(EnvironmentProps.mongooseURI);
// // // } catch (error) {
// // //     console.log(error);
// // // }

// // // Listen for requests.
// // app.listen(env.serverPort, () => {
// //     console.log(`Listening on port ${env.serverPort}`);
// // });
import express, { Request, Response } from 'express';
import path from 'path';

const port = 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, '../public/')));
app.use(express.static(path.resolve(__dirname, '../uploads/')));

app.get('/*', (request: Request, response: Response) => {
    response.sendFile(path.resolve(__dirname, '../public/index.html'));
    console.log('Sending new page update');
});

app.listen(port, () => {
    console.log('Server started on port: ' + port);
    console.log(path.resolve(__dirname, '../uploads/'));
});
