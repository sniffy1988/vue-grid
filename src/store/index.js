import VueEx from 'vuex';
import Vue from "vue";
import fetchGrid from '../helpers/fetchGrid';
import sort from '../helpers/sortBy';
import filterGrid from '../helpers/filterGrid';

Vue.use(VueEx);

const store = new VueEx.Store({
    state: {
        filters: [],
        sorters: [],
        grid: [],
        columns: [],
        filteredGrid: []
    },
    getters: {
        grid: ({filteredGrid}) => filteredGrid,
        filters: ({filters}) => filters,
        columns: ({columns}) => columns
    },
    mutations: {
        addFilter(state, payload) {
            state.filters = payload;
        },
        setGrid(state, payload) {
            state.grid = payload;
            state.filteredGrid = payload;
        },
        changeGrid(state, payload) {
            state.filteredGrid = payload;
        },
        setColumns: (state, payload) => {
            state.columns = payload;
        }
    }
    ,
    actions: {
        async loadGrid({commit}) {
            const response = await fetchGrid();
            if (response.status === 200) {
                let {data} = response;

                commit('setGrid', data);

                //generate columns
                const firstRow = data[0];
                if (firstRow) {
                    let columnsPayload = Object.keys(firstRow).map((item) => {
                        return {
                            name: item,
                            sortFilter: ''
                        }
                    });

                    commit('setColumns', columnsPayload);
                }
            }
        },
        addFilter({commit, state}, payload) {
            let resultFilters = [];
            let oldFilters = state.filters;
            if(!oldFilters.length) {
                resultFilters = {
                    name: payload.name,
                    value: payload.value
                }
            } else {
               //todo fix add logic for add new item and change items if value is exist and remove if value is all;
            }
            console.log('payload: ', payload);
            console.log('oldFilters: ', oldFilters);
            commit('addFilter', resultFilters);
        },
        filterGrid({commit, state}) {
            const {filteredGrid, filters} = state;
            const newGrid = filterGrid(filteredGrid, filters);
            commit('changeGrid', newGrid);
        },
        sortGrid({commit, state}, payload) {
            let {columns, filteredGrid} = state;
            let newColumns = columns.map((item) => {
               if(item.name === payload) {
                   let {sortFilter} = item;
                   if(sortFilter === '') {
                       sortFilter = 'asc';
                   } else if(sortFilter === 'asc') {
                       sortFilter = 'desc';
                   } else {
                       sortFilter = '';
                   }
                   item.sortFilter = sortFilter;
               }
               return item;
            });
            const newGrid = sort(filteredGrid, newColumns);

            commit('setColumns', newColumns);
            commit('changeGrid', newGrid);
        }
    }
});

export default store;
