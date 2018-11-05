<template>
    <div class="ui container">
        <div class="filters-block ui form">
            <GridFilter :options="countriesItems" name="Country"/>
            <GridFilter :options="rmcItems" name="RMC"/>
        </div>
        <Grid :items="items"/>
        <Modal/>
    </div>
</template>

<script>
    import Grid from './components/grid/grid';
    import GridFilter from './components/filters/filter';
    import Modal from './components/modal/modalGrid';
    import {mapGetters} from 'vuex';

    export default {
        name: 'app',
        components: {
            Grid,
            GridFilter,
            Modal
        },
        data: () => ({}),
        computed: {
            ...mapGetters({
                items: 'grid',
                countriesItems: 'countryFilters',
                rmcItems: 'rmcFilters'
            })
        },
        mounted() {
            this.$store.dispatch('loadGrid');
        }
    }
</script>

<style>
    .filters-block {
        display: flex;
    }

    .filters-block > div {
        margin-right: 10px !important;
    }
</style>
