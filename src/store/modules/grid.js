import fetchGrid from "../../helpers/fetchGrid";
import filterGrid from "../../helpers/filterGrid";
import sort from "../../helpers/sortBy";

const grid = {
    state: {
        filters: [],
        countryFilters: [],
        rmcFilters: [],
        grid: [],
        columns: [],
        filteredGrid: []
    },
    getters: {
        grid: ({filteredGrid}) => filteredGrid,
        filters: ({filters}) => filters,
        columns: ({columns}) => columns,
        countryFilters: ({countryFilters}) => countryFilters,
        rmcFilters: ({rmcFilters}) => rmcFilters,
    },
    mutations: {
        addFilter(state, payload) {
            state.filters = payload;
        },
        setGrid(state, payload) {
            state.grid = payload;
            state.filteredGrid = payload;
        },
        setCountryFilters(state, payload) {
            state.countryFilters = payload;
        },
        setRmcFilters(state, payload) {
            state.rmcFilters = payload;
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

                let countries = data.map((item) => {
                    return item.country;
                });

                let rmcItems = data.map((item) => {
                    return item.rmc;
                });

                commit('setCountryFilters', countries);
                commit('setRmcFilters', rmcItems);
            }
        },
        addFilter({commit, state, dispatch}, payload) {
            let resultFilters = [];
            let oldFilters = state.filters;
            resultFilters = oldFilters.filter((item) => {
                return item.name !== payload.name;
            });
            if (payload.value !== '') {
                resultFilters = [...resultFilters, {
                    name: payload.name,
                    value: payload.value
                }];
            }

            commit('addFilter', resultFilters);
            dispatch('changeGrid');
        },
        sortGrid({commit, state, dispatch}, payload) {
            let {columns} = state;
            let newColumns = columns.map((item) => {
                if (item.name === payload) {
                    let {sortFilter} = item;
                    if (sortFilter === '') {
                        sortFilter = 'asc';
                    } else if (sortFilter === 'asc') {
                        sortFilter = 'desc';
                    } else {
                        sortFilter = '';
                    }
                    item.sortFilter = sortFilter;
                }
                return item;
            });

            commit('setColumns', newColumns);
            dispatch('changeGrid');
        },
        changeGrid({state, commit}) {
            const {grid, columns, filters} = state;
            let newGrid = filterGrid(grid, filters);
            newGrid = sort(newGrid, columns);
            commit('changeGrid', newGrid);
        },
        showPopup({dispatch}) {
            dispatch('changeModal');
        }
    }
};

export default grid;