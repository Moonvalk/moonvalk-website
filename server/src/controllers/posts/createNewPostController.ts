import { Request, Response } from "express";
import { JwtPayload } from 'jsonwebtoken';
import Post from "../../models/Post";

export async function createNewPostController(request_: Request, response_: Response): Promise<void> {
    const {id} = response_.locals.userInfo as JwtPayload;
    const {title, subtitle, date, status, category, summary, content, file, uri} = request_.body;

    console.log(`Creating new post now`);

    // const formattedDate = format(new Date(date), TEXT_FORMATTING.POST_DATE);
    const postDoc = await Post.create({
        title: title,
        subtitle: subtitle,
        date: date,
        status: status,
        category: category,
        summary: summary,
        content: content,
        coverFile: file,
        author: id,
        uri: uri,
    });
    response_.json(postDoc);
}
