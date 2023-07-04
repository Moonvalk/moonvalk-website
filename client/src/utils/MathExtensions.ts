
export function clamp(value_: number, minimum_: number, maximum_: number): number {
    return Math.min(Math.max(value_, minimum_), maximum_);
}
