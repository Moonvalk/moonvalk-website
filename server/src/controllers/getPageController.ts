import path from 'path';
import { Request, Response } from 'express';

/**
 * General use controller for handling wildcards page requests. This is used
 * to send React our base index.html for client side routing.
 * @param request_ - 
 * @param response_ - 
 * @return {void} void
 */
export function getPageController(request_: Request, response_: Response): void {
    const indexPageURI = '../public/index.html';
    response_.sendFile(path.resolve(__dirname, indexPageURI));
}
