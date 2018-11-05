import VueEx from 'vuex';
import Vue from "vue";

import grid from './modules/grid';
import modal from './modules/modal';

Vue.use(VueEx);

const store = new VueEx.Store({
    modules: {
        grid,
        modal
    }
});

export default store;
