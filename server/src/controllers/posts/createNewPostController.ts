import { Request, Response } from "express";
import fs from 'fs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { EnvironmentProps } from "../../util/EnvironmentProps";
import Post from "../../models/Post";


export async function createNewPostController(request_: Request, response_: Response): Promise<void> {
    // Rename cover file.
    const {originalname, path} = request_.file;
    const splitString = originalname.split('.');
    const extension = splitString[splitString.length - 1];
    const newPath = path + '.' + extension;
    fs.renameSync(path, newPath);

    const {token} = request_.cookies;
    jwt.verify(token, EnvironmentProps.config.secretToken, {}, async (error_, info_) => {
        if (error_) {
            throw error_;
        }
        const {title, summary, content} = request_.body;
        const postDoc = await Post.create({
            title: title,
            summary: summary,
            content: content,
            coverFile: newPath,
            author: (info_ as JwtPayload).id,
        });
        response_.json(postDoc);
    });
}
