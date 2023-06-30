import { Request, Response } from 'express';
import Changelog from "../../models/Changelog";

/**
 * Handles finding all changelogs available on the database and returns them in
 * chronological order for display.
 * @param request_ - 
 * @param response_ - 
 * @return {Promise<void>} void
 */
export async function getChangelogsController(request_: Request, response_: Response): Promise<void> {
    const logs = await Changelog.find()
        .sort({createdAt: -1})
    response_.json(logs);
}
