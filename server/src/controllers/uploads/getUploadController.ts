import { Request, Response } from 'express';
import Upload from '../../models/Upload';
import { RESPONSE_CODES, RESPONSE_MESSAGES } from '../../constants/Responses';

/**
 * 
 * @param request_ - 
 * @param response_ - 
 * @return {Promise<void>} void
 */
export async function getUploadController(request_: Request, response_: Response): Promise<void> {
    const {id} = request_.params;
    const uploadData = await Upload.findOne({name: id});
    if (uploadData) {
        response_.json(uploadData);
    } else {
        response_.status(RESPONSE_CODES.GENERAL_ERROR).json(RESPONSE_MESSAGES.GENERAL_ERROR);
    }
}
