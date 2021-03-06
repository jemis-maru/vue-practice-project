import VueRouter from 'vue-router';
import Home from './components/pages/Home.vue';
import Demo from './components/pages/Demo.vue';
import AddReview from './components/pages/AddReview.vue';
import UpdateReview from './components/pages/UpdateReview.vue';
import AllReviews from './components/pages/AllReviews.vue';
import FindReview from './components/pages/FindReview.vue';
import AdminLogin from './components/pages/admin/AdminLogin.vue';
import AdminHome from './components/pages/admin/AdminHome.vue';
import AdminApproved from './components/pages/admin/AdminApproved.vue';
import AdminManageSlider from './components/pages/admin/AdminManageSlider.vue';
import store from './store/store.js';

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
            path: '/addReview',
            component: AddReview,
        },
        {
            path: '/updateReview',
            component: UpdateReview,
        },
        {
            path: '/allReviews',
            component: AllReviews,
        },
        {
            path: '/findReview',
            component: FindReview,
        },
        {
            path: '/login',
            component: AdminLogin,
            meta: {
                alreadyAuth: true,
            },
        },
        {
            path: '/admin',
            component: AdminHome,
            meta: {
                requiredAuth: true,
            },
        },
        {
            path: '/adminApproved',
            component: AdminApproved,
            meta: {
                requiredAuth: true,
            },
        },
        {
            path: '/manageSlider',
            component: AdminManageSlider,
            meta: {
                requiredAuth: true,
            },
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


router.beforeEach(function(to, _, next){
    store.dispatch('adminLoginModule/isAlreadyLogin');
    // console.log(store.getters['adminLoginModule/isLogin']);
    if(to.meta.requiredAuth && !store.getters['adminLoginModule/isLogin']){
        next('/login');
    }
    else if(to.meta.alreadyAuth && store.getters['adminLoginModule/isLogin']){
        next('/admin');
    }
    else{
        next();
    }
});

export default router;