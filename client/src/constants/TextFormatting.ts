
/**
 * Contains text formatting options used by date-fns.
 */
export const enum TEXT_FORMATTING {
    /**
     * Format for a post date when displayed to the user.
     */
    POST_DISPLAY_DATE = 'MMMM d, yyyy',

    /**
     * Format for a post date when used internally (to / from database).
     */
    POST_INTERNAL_DATE = 'MM/d/yyyy',
}
