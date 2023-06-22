import bcrypt from 'bcryptjs';

// Generate new salt and secret token for users.
export const BCRYPT_SECRET_TOKEN = 'nq44wenviuoeqwnvv8731h';
export const BCRYPT_SALT = bcrypt.genSaltSync(10);
