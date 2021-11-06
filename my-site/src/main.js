import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import showTip from './utils/ShowTip';
import '@/mock/mock';
import '@/mock/blog';
import '@/mock/about';
import '@/mock/project';
import '@/mock/message';
import './styles/global.less';
import '@/eventBus/eventBus';
import lazy from '@/directives/lazy';
import store from '@/store';

store.dispatch('setting/getRemoteData')
Vue.config.productionTip = false
import Loading from '@/components/Loading/Loading';
Vue.prototype.$showTip = showTip;
Vue.directive('loading',Loading)
Vue.directive('lazy',lazy)
const vm = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')




