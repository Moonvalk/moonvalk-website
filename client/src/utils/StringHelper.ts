
/**
 * Class containing static functions for helping to generate strings.
 */
export class StringHelper {
    /**
     * Generates a string filled with characters at the desired length.
     * @param characterCode_ - The character code used to generate.
     * @param length_ - The total length of the generated string.
     * @return {string} A new generated string with the matching config.
     */
    public static generateCharFill(characterCode_: number, length_: number = 8): string {
        const char = String.fromCharCode(characterCode_);
        return StringHelper.generateRepeatFill(char, length_);
    }

    /**
     * Generates a string filled with the repeated fill string at the desired length.
     * @param repeat_ - The string to be repeated.
     * @param length_ - The total number of times the string will be repeated.
     * @return {string} A new generated string with the matching config.
     */
    public static generateRepeatFill(repeat_: string, length_: number = 1): string {
        let value = '';
        for (let index = 0; index < length_; index++) {
            value = value.concat(repeat_);
        }
        return value;
    }
}