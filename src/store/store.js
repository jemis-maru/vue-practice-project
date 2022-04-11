import Vuex from 'vuex';
import Vue from 'vue';
import home from "./modules/home/home.js";
import adminLogin from "./modules/admin/adminLogin.js";
import adminHome from "./modules/admin/adminHome.js";
import allReviews from "./modules/allReviews/allReviews.js";
import findReview from './modules/findReview/findReview.js';
import adminApproved from "./modules/admin/adminApproved.js";
import adminManageSlider from "./modules/admin/adminManageSlider.js";


Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        homeModule: home,
        adminLoginModule: adminLogin,
        adminHomeModule: adminHome,
        allReviewsModule: allReviews,
        adminApprovedModule: adminApproved,
        adminManageSliderModule: adminManageSlider,
        findReviewModule: findReview,
    },
});

export default store;