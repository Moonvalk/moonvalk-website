import multer from "multer";
import { Request } from 'express';

// Set up image uploader.
const storage = multer.memoryStorage();
const filter = (request_: Request, file_: Express.Multer.File, callback_: multer.FileFilterCallback,) => {
    if (file_.mimetype.split('/')[0] === 'image') {
        callback_(null, true);
    } else {
        callback_(new Error('Only image files are allowed at this time'));
    }
};
export const imageUploader = multer({
    storage: storage,
    fileFilter: filter,
    dest: '../uploads/',
    limits: { fieldSize: 25 * 1024 * 1024 },
});
