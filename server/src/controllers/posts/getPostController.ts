import { Request, Response, response } from "express";
import Post from "../../models/Post";

export async function getPostController(request_: Request, response_: Response): Promise<void> {
    const {id} = request_.params;
    const postDoc = await Post.findById(id)
        .select('-createdAt -updatedAt');
    if (!postDoc) {
        response_.status(404).json('An error occurred.');
    }
    await postDoc.populate('author', ['username']);
    response_.json(postDoc);
}
