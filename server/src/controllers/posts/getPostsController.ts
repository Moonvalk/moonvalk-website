import { Request, Response } from "express";
import Post from "../../models/Post";

export async function getPostsController(request_: Request, response_: Response): Promise<void> {
    const posts = await Post.find()
        .populate('author' , ['username'])
        .sort({ createdAt: -1 });
    response_.json(posts);
}
