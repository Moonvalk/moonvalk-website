import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { EnvironmentProps } from '../../util/EnvironmentProps';

export function getUserProfileController(request_: Request, response_: Response): void {
    response_.json(response_.locals.userInfo);
}
