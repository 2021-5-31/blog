import Vue from 'vue';
const vm = new Vue({});
Vue.prototype.$bus = vm;
export default vm;