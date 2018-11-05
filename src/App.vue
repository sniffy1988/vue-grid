<template>
    <div id="app">
        <div class="container-fluid">
            <GridFilter :options="countriesItems" name="Country"/>
            <GridFilter :options="rmcItems" name="RMC"/>
            <Grid :items="items"/>
        </div>
    </div>
</template>

<script>
    import Grid from './components/grid/grid';
    import GridFilter from './components/filters/filter';
    import {mapGetters} from 'vuex';

    export default {
        name: 'app',
        components: {
            Grid,
            GridFilter
        },
        data: () => ({
        }),
        computed: {
            ...mapGetters({
                items: 'grid',
                countriesItems: 'countryFilters',
                rmcItems: 'rmcFilters'
            })
        },
        mounted(){
            this.$store.dispatch('loadGrid');
        }
    }
</script>

<style>

</style>
