
/**
 * Available codes to be sent as responses.
 */
export const enum RESPONSE_CODES {
    GENERAL_ERROR = 400,
}

/**
 * Available messages to be sent as responses.
 */
export const enum RESPONSE_MESSAGES {
    GENERAL_ERROR = 'An error occurred.',
    MISMATCH_CREDENTIALS = 'Mismatched credentials.',
    INCORRECT_AUTHOR = 'You are not the author.',
    NO_EXISTING_POST = 'Cannot find existing post with this id.',
}
 