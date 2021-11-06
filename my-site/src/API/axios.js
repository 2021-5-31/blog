import axios from 'axios';
import showTip from '@/utils/ShowTip';
const ins = axios.create();
ins.interceptors.response.use(function(res){
    const appContainer = document.getElementById('app')
    if(typeof res.data === 'string'){
        res.data = JSON.parse(res.data);
        showTip(appContainer,'error',res.data.msg,2000);
        return null;
    }
    if(res.data.code !== 0){
        showTip(null,'error',res.data.msg,2000);
        return null;
    }
    return res.data.data;
})
export default ins;