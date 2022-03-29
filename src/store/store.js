import Vuex from 'vuex';
import Vue from 'vue';
import home from "./modules/home/home.js";
import adminLogin from "./modules/admin/adminLogin.js";


Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        homeModule: home,
        adminLoginModule: adminLogin,
    },
});

export default store;