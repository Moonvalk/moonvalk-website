
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

    /**
     * Determines if the input string is alphabetical.
     * @param {string} source_ - The input string to check.
     * @return {boolean} True if the string is alphabetical.
     */
    public static isAlpha(source_: string): boolean {
        return source_.toUpperCase() !== source_.toLowerCase();
    }
    
    /**
     * Determines if the input character is numeric (0-9).
     * @param {string} source_ - The input character to check.
     * @return {boolean} True if the character is numeric.
     */
    public static isCharNumeric(source_: string): boolean {
        const char = source_.charCodeAt(0);
        const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
        return (char >= bounds[0] && char <= bounds[1]);
    }

    /**
     * Determines if the input string is completely numeric (0-9).
     * @param {string} source_ - The input string to check.
     * @return {boolean} True if the entire input string is numeric.
     */
    public static isNumeric(source_: string): boolean {
        let valid = true;
        for (const char of source_) {
            if (!this.isCharNumeric(char)) {
                valid = false;
                break;
            }
        }
        return valid;
    }

    /**
     * Converts the input title text to a useable URI of alphabetical
     * and numeric characters.
     * @param {string} input_ - The input string to be converted.
     * @return {string} A converted value that is usable as a URI.
     */
    public static convertToURI(input_: string): string {
        const splitInput = input_.split('');
        let newURI = '';
        for (const char of splitInput) {
            if (StringHelper.isAlpha(char)) {
                newURI += char.toLowerCase();
            } else if (StringHelper.isCharNumeric(char)) {
                newURI += char; 
            } else if (char === ' ') {
                newURI += '-';
            }
        }
        return newURI;
    }
}