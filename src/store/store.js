import Vuex from 'vuex';
import Vue from 'vue';
import home from "./modules/home/home.js";
import adminLogin from "./modules/admin/adminLogin.js";
import adminHome from "./modules/admin/adminHome.js";
import allReviews from "./modules/allReviews/allReviews.js";
import adminApproved from "./modules/admin/adminApproved.js";


Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        homeModule: home,
        adminLoginModule: adminLogin,
        adminHomeModule: adminHome,
        allReviewsModule: allReviews,
        adminApprovedModule: adminApproved,
    },
});

export default store;