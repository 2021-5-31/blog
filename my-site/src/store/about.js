import getAbout from '@/API/about'
export default {
    namespaced:true,
    state:{
        loading:false,
        data:[],
    },
    mutations:{
        setLoading(state,payload){
            state.loading = payload;
        },
        setData(state,payload){
            state.data = payload;
        },
    },
    actions:{
        async getRemoteData(context,payload){
            context.commit('setLoading',true)
            const res = await getAbout();
            context.commit('setData',res);
            context.commit('setLoading',false)
            return res;
        }
    }
}