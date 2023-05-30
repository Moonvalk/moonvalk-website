
const serverPort = 3000;

export function getServerURI(append?: string): string {
    const uri = 'http://localhost:' + serverPort + '/';
    if (append) {
        return uri + append;
    }
    return uri;
}