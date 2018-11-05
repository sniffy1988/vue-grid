<template>
    <div class="">
        <table class="ui celled sortable selectable table">
            <thead>
            <tr>
                <th class=""
                    :class="{'sorted': true, 'ascending' : key.sortFilter === 'asc', 'descending' : key.sortFilter === 'desc'}"
                    :key="index" @click="sortGrid(key.name)" v-for="(key, index) in columns">
                    {{key.name | capitalize}}
                </th>
            </tr>
            </thead>
            <template v-if="items.length">
                <tr :key="index" v-for="(columns, index) in items" @click="handleRowClick">
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
            ...mapActions(['sortGrid']),
            handleRowClick() {
                console.log('show popup');
            }
        }
    }
</script>

<style scoped>

</style>
