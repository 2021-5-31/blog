import ins from './axios';
export async function postMessage(body) {
    return await ins.post('/api/message', body);
}
export async function getMessage(page = 1, limit = 10) {
    return await ins.get('/api/message', {
        params: { page, limit }
    });
}