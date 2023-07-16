import { Request, Response } from 'express';
import Upload from '../../models/Upload';
import { RESPONSE_CODES, RESPONSE_MESSAGES } from '../../constants/Responses';
import FileSystem from 'fs';

/**
 * 
 * @param request_ - 
 * @param response_ - 
 * @return {Promise<void>} void
 */
export async function deleteUploadController(request_: Request, response_: Response): Promise<void> {
    const {id} = request_.body;
    const upload = await Upload.findByIdAndDelete(id);
    FileSystem.unlink(upload.source, (error_) => {
        if (error_) {
            throw error_;
        }   
        response_.json(upload);
    });
}
