import ins from './axios';
export default async ()=>{
    return await ins.get('/api/setting');
}