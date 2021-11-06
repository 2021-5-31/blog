import Vue from 'vue'
import VueRouter from 'vue-router'
import 'nprogress/nprogress.css'
import { start, done, configure } from 'nprogress'
import store from '@/store';
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err)
}

function delay(duration) {
    return new Promise(resolve => {
        setInterval(() => {
            resolve()
        }, duration)
    })
}
configure({ trickleSpeed: 30 })
function progressBar(fn) {
    return async () => {
        start();
        if (process.env.NODE_ENV === 'development') {
            await delay(1000)
        }
        const comp = await fn();
        done();
        return comp
    }

}
Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {
            name: 'home',
            path: '/',
            component: progressBar(() => import('@/components/views/Home/Home')),
            meta: { title: '首页' }
        },
        {
            name: 'blog',
            path: '/blog',
            component: progressBar(() => import('@/components/views/Blog/Blog')),
            meta: { title: '文章' }
        },
        {
            name: 'categoryId',
            path: '/blog/cate/:categoryId',
            component: progressBar(() => import('@/components/views/Blog/Blog')),
            meta: { title: '文章列表' }
        },
        {
            name: 'detail',
            path: '/blog/detail/:id',
            component: progressBar(() => import('@/components/views/Blog/Detail')),
            meta: { title: '文章详情' }
        },
        {
            name: 'about',
            path: '/about',
            component: progressBar(() => import('@/components/views/About')),
            meta: { title: '关于我' }
        },
        {
            name: 'project',
            path: '/project',
            component: progressBar(() => import('@/components/views/Project')),
            meta: { title: '项目&效果' }
        },
        {
            name: 'message',
            path: '/message',
            component: progressBar(() => import('@/components/views/Message')),
            meta: { title: '留言板' }
        },
    ],
    mode: 'history',
})
router.afterEach((to) => {
    if (to.name === 'home') {
        document.title = to.meta.title + '-' + store.state.setting.data.siteTitle;
    } else if (to.name === 'blog') {
        document.title = to.meta.title + '-' + store.state.setting.data.siteTitle;
    } else if (to.name === 'categoryId') {
        document.title = 'MySite' + to.meta.title;
    } else if (to.name === 'detail') {
        document.title = to.meta.title + '-' + store.state.setting.data.siteTitle;
    } else if (to.name === 'about') {
        document.title = to.meta.title + '-' + store.state.setting.data.siteTitle;
    } else if (to.name === 'project') {
        document.title = to.meta.title + '-' + store.state.setting.data.siteTitle;
    } else {
        document.title = to.meta.title + '-' + store.state.setting.data.siteTitle;
    }
})
export default router;