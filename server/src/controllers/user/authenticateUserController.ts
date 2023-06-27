import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { EnvironmentProps } from "../../util/EnvironmentProps";


export function authenticateUserController(
    request_: Request,
    response_: Response,
    next_: NextFunction,
): Promise<void> {
    const {token} = request_.cookies;
    if (!token || token === '') {
        response_.json('User is not logged in.');
        return;
    }
    jwt.verify(token, EnvironmentProps.config.accessSecret, {}, (error_, info_) => {
        if (error_) {
            response_.status(401).json('Invalid user token.');
            return;
        }
        response_.locals.userInfo = info_;
        next_();
    });
}
