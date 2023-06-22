import { Request, Response } from 'express';
import Changelog from "../models/Changelog";

/**
 * Handles creating a new changelog and posting it to the database.
 * @param {Request} request_ - 
 * @param {Response} response_ - 
 * @return {Promise<void>} void
 */
export async function createChangelogController(request_: Request, response_: Response): Promise<void> {
    console.log(request_.body);
    const newLog = new Changelog({
        version: request_.body.version,
        date: request_.body.date,
        summary: request_.body.summary,
    });
    const createdLog = await newLog.save();
    response_.json(createdLog);
}
