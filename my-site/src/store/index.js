import Vuex from 'vuex';
import Vue from 'vue';
import about from './about'
import project from './project'
import top from './top'
import home from './home'
import setting from './setting'
Vue.use(Vuex);
const store = new Vuex.Store({
    modules:{
        about,
        project,
        top,
        home,
        setting,
    }
})
export default store;