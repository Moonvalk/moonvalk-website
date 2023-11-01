import { Request, Response } from "express";
import Post from "../../models/Post";

export async function getAllPostsController(request_: Request, response_: Response): Promise<void> {
    const posts = await Post.find()
        .sort({ 'date': 'desc' })
        .select('-content -author -createdAt -updatedAt');
    response_.json(posts);
}
