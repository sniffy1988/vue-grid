<template>
    <div class="">
        {{filters}}
        {{columns}}
        <table>
            <tr>
                <th :key="index" @click="sortColumns(index)" v-for="(key, index) in columns">
                    {{key.name | capitalize}} {{key.sortFilter}}
                </th>
            </tr>
            <tr :key="index" v-for="(columns, index) in items">
                <Cell :key="index" v-for="(item, key, index) in columns" :item="item" :type="key"/>
            </tr>
        </table>
    </div>
</template>

<script>
    import sort from '../../helpers/sortBy';
    import {mapGetters} from 'vuex';
    import Cell from './cell';

    export default {
        name: 'Grid',
        props: {
            items: {
                type: Array,
                required: true
            }
        },
        components: {
            Cell
        },
        data: () => ({
            filteredItems: [],
        }),
        computed: {
            ...mapGetters(['filters']),
            columns() {
                const firstRow = this.items[0];
                if (firstRow) {
                    return Object.keys(firstRow).map((item) => {
                        return {
                            name: item,
                            sortFilter: ''
                        }
                    });
                } else {
                    return [];
                }
            }
        },
        methods: {
            sortColumns(index) {
                let {sortFilter, name} = this.columns[index];
                switch (sortFilter) {
                    case '':
                        sortFilter = 'asc';
                        break;
                    case 'asc':
                        sortFilter = 'desc';
                        break;
                    case 'desc':
                        sortFilter = '';
                        break;
                }
                let newColumns = [...this.columns];
                newColumns[index] = {name, sortFilter};
                this.columns = newColumns;
                this.filteredItems = sort(this.filteredItems, this.columns);
            }
        }
    }
</script>

<style scoped>
    table {
        width: 100%;
        table-layout: fixed;
    }

    th {
        padding: 5px;
        cursor: pointer;
        background: #999;
    }

    td {
        padding: 5px;
    }
</style>
