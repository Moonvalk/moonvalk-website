import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../../constants/Responses";
import User from "../../models/User";
import { BCRYPT_SECRET_TOKEN } from "../../util/Encryption";

/**
 * Handles a login attempt by validating user data with what is stored in our database.
 * @param request_ - 
 * @param response_ - 
 * @return {Promise<void>} void
 */
export async function loginUserController(request_: Request, response_: Response): Promise<void> {
    // Pull requested username and password pair from the request.
    const {username, password} = request_.body;
    const userDocument = await User.findOne({username: username});
    const passwordIsMatch = userDocument
        ? bcrypt.compareSync(password, userDocument.password) : false;

    // If we have found a matching password for the unique user document attempt to log in.
    if (passwordIsMatch) {
        jwt.sign({
            username: username,
            id: userDocument._id,
        }, BCRYPT_SECRET_TOKEN, (error_: Error | null, token_: string | undefined) => {
            if (error_) {
                throw error_;
            }
            response_.cookie('token', token_).json({
                id: userDocument._id,
                username: username,
            });
        });
    } else {
        response_.status(RESPONSE_CODES.GENERAL_ERROR).json(RESPONSE_MESSAGES.MISMATCH_CREDENTIALS);
    }
}