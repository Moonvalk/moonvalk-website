import { NextFunction, Request, Response } from "express";
import { ACCESS_LEVEL } from "../../constants/AccessLevel";
import { authenticateUserController } from "./authenticateUserController";


export function authorizeAccessController(
    request_: Request,
    response_: Response,
    next_: NextFunction,
    accessLevel_: ACCESS_LEVEL,
): void {
    authenticateUserController(request_, response_, () => {
        if (response_.locals.userInfo.accessLevel < accessLevel_) {
            response_.status(401).json('User is not authorized.');
            return;
        }
        next_();
    });
}

export function authorizeUserController(
    request_: Request, response_: Response, next_: NextFunction): void {
    authorizeAccessController(request_, response_, next_, ACCESS_LEVEL.USER);
}

export function authorizeAdminController(
    request_: Request, response_: Response, next_: NextFunction): void {
    authorizeAccessController(request_, response_, next_, ACCESS_LEVEL.ADMIN);
}
