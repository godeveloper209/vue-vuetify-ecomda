import Vue from 'vue';
import Vuex from 'vuex';
import Products from '@/store/modules/products/index';
import Auth from '@/store/modules/auth/index';
import Searches from '@/store/modules/searches/index';
import Feedback from '@/store/modules/Feedback/index'
Vue.use(Vuex);

const modules = {
    Products,
    Auth,
    Searches,
    Feedback

};
const state = {};

const actions = {};

const getters = {};

const mutations = {};

export default new Vuex.Store({
    modules,
    state,
    actions,
    getters,
    mutations
});
