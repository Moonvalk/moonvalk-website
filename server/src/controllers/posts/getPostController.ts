import { Request, Response, response } from "express";
import Post from "../../models/Post";

export async function getPostController(request_: Request, response_: Response): Promise<void> {
    const {id} = request_.params;
    let postDoc;
    try {
        postDoc = await Post.findById(id);
    } catch (error_) {
        response_.status(404).json('An error occurred.');
        return;
    }
        // .select('-createdAt -updatedAt');
    if (!postDoc) {
        response_.status(404).json('An error occurred.');
    }
    await postDoc.populate('author', ['username']);
    response_.json(postDoc);
}
