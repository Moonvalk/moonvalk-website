import { Request, Response } from "express";
import fs from 'fs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { EnvironmentProps } from "../../util/EnvironmentProps";
import Post from "../../models/Post";
import { format } from 'date-fns';
import { TEXT_FORMATTING } from "../../constants/TextFormatting";

export async function editPostController(request_: Request, response_: Response): Promise<void> {
    console.log(`Request body is null: ${request_.body === null}`);
    console.log(`Request body stringified: ${await JSON.stringify(request_.body)}`);
    console.log(`Edit post id: ${request_.body.id}`);
    const {token} = request_.cookies;
    jwt.verify(token, EnvironmentProps.config.accessSecret, {}, async (error_, info_) => {
        if (error_) {
            throw error_;
        }
        const {id, title, date, status, category, subtitle, summary, content} = request_.body;
        console.log(`Title: ${title}, date: ${date}, id: ${id}`);
        const postDoc = await Post.findById(id);
        if (!postDoc) {
            return response_.status(400).json(`No existing post with this id: ${id}`);
        }
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify((info_ as JwtPayload).id);
        if (!isAuthor) {
            return response_.status(400).json('Author does not have permission to edit this post.');
        }
        await postDoc.updateOne({
            title: title,
            date: format(new Date(date), TEXT_FORMATTING.POST_DATE),
            status: status,
            category: category,
            subtitle: subtitle,
            summary: summary,
            content: content,
            coverFile: request_.body.file ? request_.body.file : postDoc.coverFile,
        });
        response_.json(postDoc);
    });
}
