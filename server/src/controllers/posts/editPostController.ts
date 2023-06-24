import { Request, Response } from "express";
import fs from 'fs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { EnvironmentProps } from "../../util/EnvironmentProps";
import Post from "../../models/Post";

export async function editPostController(request_: Request, response_: Response): Promise<void> {
    let newPath: string = null;
    if (request_.file) {
        const {originalname, path} = request_.file;
        const splitString = originalname.split('.');
        const extension = splitString[splitString.length - 1];
        newPath = path + '.' + extension;
        fs.renameSync(path, newPath);
    }
    const {token} = request_.cookies;
    jwt.verify(token, EnvironmentProps.config.secretToken, {}, async (error_, info_) => {
        if (error_) {
            throw error_;
        }
        const {id, title, summary, content} = request_.body;
        const postDoc = await Post.findById(id);
        if (!postDoc) {
            return response_.status(400).json('No existing post with this id.');
        }
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify((info_ as JwtPayload).id);
        if (!isAuthor) {
            return response_.status(400).json('Author does not have permission to edit this post.');
        }
        await postDoc.updateOne({
            title: title,
            summary: summary,
            content: content,
            coverFile: newPath ? newPath : postDoc.coverFile,
        });
        response_.json(postDoc);
    });
}
