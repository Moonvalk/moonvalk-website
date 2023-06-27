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

    const {id} = response_.locals.userInfo as JwtPayload;
    const {title, subtitle, date, status, category, summary, content} = request_.body;
    const postDoc = await Post.create({
        title: title,
        subtitle: subtitle,
        date: date,
        status: status,
        category: category,
        summary: summary,
        content: content,
        coverFile: newPath,
        author: id,
    });
    response_.json(postDoc);
}
