import { Request, Response } from 'express';
import Upload from '../../models/Upload';

/**
 * 
 * @param request_ - 
 * @param response_ - 
 * @return {Promise<void>} void
 */
export async function getUploadsController(request_: Request, response_: Response): Promise<void> {
    const uploads = await Upload.find()
        .sort({createdAt: -1});
    response_.json(uploads);
}
