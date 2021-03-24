import Vue from 'vue';
import Vuex from "vuex";
Vue.use(Vuex);
import {
    state,
    mutations,
    getters
} from "./mutations";
import actions from "./actions";
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})