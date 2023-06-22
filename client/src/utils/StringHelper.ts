
export class StringHelper {

    public static generateCharFill(characterCode_: number, length_: number = 8): string {
        const char = String.fromCharCode(characterCode_);
        return StringHelper.generateRepeatFill(char, length_);
    }

    public static generateRepeatFill(repeat_: string, length_: number = 1): string {
        let value = '';
        for (let index = 0; index < length_; index++) {
            value = value.concat(repeat_);
        }
        return value;
    }
}