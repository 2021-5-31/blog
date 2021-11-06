import getSetting from "../API/setting"
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
            const res = await getSetting();
            context.commit('setData',res);
            context.commit('setLoading',false);
            if (res.favicon) {
                // <link rel="shortcut icon " type="images/x-icon" href="./favicon.ico">
                let link = document.querySelector("link[ref='shortcut icon']");
                if (link) {
                  return;
                }
                link = document.createElement("link");
                link.rel = "shortcut icon";
                link.type = "images/x-icon";
                link.href = res.favicon;
                document.querySelector("head").appendChild(link);
              }
        }
    }
}