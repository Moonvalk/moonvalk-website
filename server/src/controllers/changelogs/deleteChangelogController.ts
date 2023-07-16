import { Request, Response } from 'express';
import Changelog from "../../models/Changelog";

/**
 * Handles creating a new changelog and posting it to the database.
 * @param {Request} request_ - 
 * @param {Response} response_ - 
 * @return {Promise<void>} void
 */
export async function deleteChangelogController(request_: Request, response_: Response): Promise<void> {
    const {id} = request_.body;
    const log = await Changelog.findByIdAndDelete(id);
    response_.json(log);
}
