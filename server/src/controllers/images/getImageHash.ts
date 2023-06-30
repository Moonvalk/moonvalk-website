import { Request, Response } from 'express';
import ImageHash from "../../models/ImageHash";

/**
 * Handles finding all changelogs available on the database and returns them in
 * chronological order for display.
 * @param request_ - 
 * @param response_ - 
 * @return {Promise<void>} void
 */
export async function getImageHash(request_: Request, response_: Response): Promise<void> {
    const {id} = request_.params;
    const hash = await ImageHash.findOne({source: id});
    response_.json(hash);
}
