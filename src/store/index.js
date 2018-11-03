import VueEx from 'vuex';
import Vue from "vue";

Vue.use(VueEx);

const store = new VueEx.Store({
    state: {
        filters: [],
    },
    mutations: {
        addFilter (state, payload) {
            let {filters} = state;
            let newFilters;
            let oldFilter  = filters.find((item) => {
               return item.name === payload.name; 
            });
            if(oldFilter !== undefined) {
                newFilters = filters.filter((item) => {
                   return item.name !== payload.name; 
                });
            }

            if(newFilters) {
                state.filters = [...newFilters, {
                    value: payload.value,
                    name: payload.name
                }];
            } else {
                if(state.filters.length) {
                    state.filters = [...state.filters, {
                        value: payload.value,
                        name: payload.name
                    }];
                } else {
                    state.filters = [{
                        value: payload.value,
                        name: payload.name
                    }];
                }
            }

        }
    },
    actions: {
        addFilter({commit, state}, payload) {
            commit('addFilter', payload);
        }
    }
});

export default store;