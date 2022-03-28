import Vuex from 'vuex';
import Vue from 'vue';
import home from "./modules/home/home.js";


Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        homeModule: home,
    },
});

export default store;