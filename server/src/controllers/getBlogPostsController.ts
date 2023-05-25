import { Request, Response } from "express";

export default async function getBlogPostsController(request: Request, response: Response): Promise<void> {
    const pageId = request.params.page;
    response.json(pageId);
}