import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Gets the current file URL path.
 * @return {string} Current file name.
 */
export function getFileName(): string {
    return __filename;
}

/**
 * Gets the current directory path.
 * @return {string} Current directory path.
 */
export function getDirName(): string {
    return __dirname;
}