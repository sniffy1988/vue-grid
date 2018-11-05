import VueEx from 'vuex';
import Vue from "vue";
import  fetchGrid from '../helpers/fetchGrid';

Vue.use(VueEx);

const store = new VueEx.Store({
    state: {
        filters: [],
        grid: [],
        columns: [],
        filteredGrid: []
    },
    getters: {
        grid : ({filteredGrid})=> filteredGrid,
        filters: ({filters}) => filters,
        columns: ({columns}) => columns
    },
    mutations: {
        addFilter (state, payload) {
            //todo remove filter if value is all;
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

        },
        setGrid(state, payload) {
            state.grid = payload;
            state.filteredGrid = payload;
        },
        changeGrid(state, payload) {
            switch (payload.type) {
                case 'FILTER':
                    console.log('filter');
                    break;
                case 'SORT':
                    console.log('sort');
                    break;
            }
        }
    },
    actions: {
        async loadGrid({commit}) {
          const response = await fetchGrid();
          if(response.status === 200) {
              commit('setGrid', response.data);
          }
        },
        addFilter({commit}, payload) {
            commit('addFilter', payload);
        },
        filterGrid({commit}, payload) {
            commit('changeGrid', {
               type: 'FILTER',
               filters: []
            });
        },
        sortGrid({commit}, payload) {
            commit('changeGrid', {
                type: 'SORT',
                sorters: []
            })
        }
    }
});

export default store;
