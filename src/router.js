import VueRouter from 'vue-router';
import Home from './components/pages/Home.vue';
import Demo from './components/pages/Demo.vue';
import AllReviews from './components/pages/AllReviews.vue';

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            component: Home,
        },
        {
            path: '/demo',
            component: Demo,
        },
        {
            path: '/allReviews',
            component: AllReviews,
        },
        {
            path: '/:notfound(.*)',
            redirect: '/home',
        },
    ],
    scrollBehavior(_, _2, savedPosition){
        if(savedPosition){
            return savedPosition;
        }
        return{
            left: 0,
            top: 0,
        };
    }
});

export default router;