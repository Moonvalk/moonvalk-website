import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { EnvironmentProps } from '../../util/EnvironmentProps';

export function getUserProfileController(request_: Request, response_: Response): void {
    const {token} = request_.cookies;
    console.log('token data is: ' + token);
    if (!token || token === '') {
        response_.json('Invalid user token');
        return;
    }
    jwt.verify(token, EnvironmentProps.config.secretToken, {}, (error_, info_) => {
        if (error_) {
            throw error_;
        }
        response_.json(info_);
    });
}
