import { Request, Response } from "express";
import Post from "../../models/Post";

export async function getPostController(request_: Request, response_: Response): Promise<void> {
    const {id} = request_.params;
    const postDoc = await Post.findById(id)
        .populate('author', ['username']);
    response_.json(postDoc);
}
