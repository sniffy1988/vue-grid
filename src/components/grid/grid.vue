<template>
    <div class="">
        <table>
            <tr>
                <th :key="index" @click="sortGrid(key.name)" v-for="(key, index) in columns">
                    {{key.name | capitalize}} {{key.sortFilter}}
                </th>
            </tr>
            <template v-if="items.length">
                <tr  :key="index" v-for="(columns, index) in items">
                    <Cell :key="index" v-for="(item, key, index) in columns" :item="item" :type="key"/>
                </tr>
            </template>

            <template v-else>
                <tr>
                    <td colspan="3">
                        Sorry, no items
                    </td>
                </tr>
            </template>
        </table>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
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
            ...mapGetters(['filters', 'columns']),
        },
        methods: {
            ...mapActions(['sortGrid'])
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
