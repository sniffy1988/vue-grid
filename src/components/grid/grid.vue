<template>
    <div class="">
        {{filters}}
        <table>
            <tr>
                <th :key="index" @click="sortColumns(index)" v-for="(key, index) in columns">
                    {{key.name | capitalize}} {{key.sortFilter}}
                </th>
            </tr>
            <tr :key="index" v-for="(columns, index) in filteredItems">
                <Cell :key="index" v-for="(item, key, index) in columns" :item="item" :type="key"/>
            </tr>
        </table>
    </div>
</template>

<script>
    import sort from '../../helpers/sortBy';
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
            columns: []
        }),
        computed: {
            filters() {
                console.log('this.$store.state: ', this.$store.state);
                return this.$store.state.filters;
            }
        },
        watch: {
            items(val) {
                this.filteredItems = val.slice();
                let firstRow = this.filteredItems[0];
                if (firstRow) {
                    this.columns = Object.keys(firstRow).map((item) => {
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