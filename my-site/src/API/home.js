import ins from './axios';
async function getBanner() {
    return await ins.get('/api/banner');
}
export default getBanner;
