import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { RESPONSE_CODES } from "../../constants/Responses";
import User from "../../models/User";
import { BCRYPT_SALT } from "../../util/Encryption";

/**
 * Handles creating a new user account and storing it in the database.
 * @param request_ 
 * @param response_ 
 * @return {Promise<void>} void
 */
export async function createUserController(request_: Request, response_: Response): Promise<void> {
    const {username, email, password, firstName, lastName} = request_.body;

    // Attempt to create a new User in the database.
    try {
        const userDocument = await User.create({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, BCRYPT_SALT),
            firstName: firstName,
            lastName: lastName,
            administrator: false,
        });
    } catch (error_) {
        response_.status(RESPONSE_CODES.GENERAL_ERROR).json(error_);
    }
}
