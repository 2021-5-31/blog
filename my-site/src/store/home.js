import getBanner from "../API/home"
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
        }
    },
    actions:{
        async getRemoteData(context){
            context.commit('setLoading',true);
            const res = await getBanner();
            context.commit('setData',res);
            context.commit('setLoading',false);
        }
    }
}