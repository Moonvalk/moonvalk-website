
/**
 * Class containing static functions for helping to generate strings.
 */
export class StringHelper {
    /**
     * Object of common string RegExp expressions.
     */
    public static expressions = {
        newLine: /(?:\n|\n)/g,
    }

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

    public static isAlpha(source_: string): boolean {
        return source_.toUpperCase() !== source_.toLowerCase();
    }
    
    public static isCharNumeric(source_: string): boolean {
        const char = source_.charCodeAt(0);
        const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
        return (char >= bounds[0] && char <= bounds[0]);
    }

    public static isNumeric(source_: string): boolean {
        let valid = true;
        for (let index = 0; index < source_.length; index++) {
            if (!this.isCharNumeric(source_[index])) {
                valid = false;
                break;
            }
        }
        return valid;
    }
}