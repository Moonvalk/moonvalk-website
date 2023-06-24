import { Request, Response } from 'express';

export function logoutUserController(request_: Request, response_: Response): void {
    response_.cookie('token', '').json('ok');
}
