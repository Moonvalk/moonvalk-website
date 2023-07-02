import { Request, Response } from "express";
import Post from "../../models/Post";

export async function getPostsController(request_: Request, response_: Response): Promise<void> {
    const posts = await Post.find({ status: 'published' })
        // .populate('author' , ['username'])
        .sort({ 'date': 'desc' })
        .select('-content -status -category -author -createdAt -updatedAt');
    response_.json(posts);
}
