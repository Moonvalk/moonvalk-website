import { Request, Response } from "express";
import Post from "../../models/Post";

export async function deletePostController(request_: Request, response_: Response): Promise<void> {
    const {id} = request_.body;
    const post = await Post.findByIdAndDelete(id);
    response_.json(post);
}
