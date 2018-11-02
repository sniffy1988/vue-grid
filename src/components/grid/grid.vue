<template>
    <div class="">
        <table>
            <tr>
                <th :key="index" @click="sortColumns(index)" v-for="(key, index) in columns">
                    {{key.name | capitalize}}
                </th>
            </tr>
            <tr :key="index" v-for="(columns, index) in filteredItems">
                <Cell :key="index" v-for="(item, key, index) in columns" :item="item" :type="key"/>
            </tr>
        </table>
    </div>
</template>

<script>
    import {sortBy} from 'lodash';
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
        data: ()=> ({
            filteredItems: [],
            columns: []
        }),
        watch: {
            items(val) {
                this.filteredItems = val.slice();
                let firstRow = this.filteredItems[0];
                if (firstRow) {
                    this.columns =  Object.keys(firstRow).map((item)=> {
                        return {
                            name: item,
                            sortFilter: ''
                        }
                    });
                }
            }
        },
        methods: {
            sortColumns(index) {
                let {sortFilter, name} = this.columns[index];
                if(sortFilter === '') {
                    sortFilter = 'asc'
                } else if (sortFilter === 'asc') {
                    sortFilter = 'desc';
                } else {
                    sortFilter = 'asc';
                }
                let newColumns = [...this.columns];
                newColumns[index] = {name, sortFilter};
                this.columns = newColumns;
                console.log('name: ', sortFilter);
                //todo fix sorting
                this.filteredItems = sortBy(this.filteredItems.slice(), [name], sortFilter);
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