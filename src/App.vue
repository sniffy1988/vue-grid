<template>
    <div id="app">
        <div class="container-fluid">
            <CountryFilter/>
            <RmcFilter/>
            <Grid :items="items"/>
        </div>
    </div>
</template>

<script>
    import CountryFilter from './components/filters/countryFilter';
    import RmcFilter from './components/filters/rmcFilter';
    import Grid from './components/grid/grid';

    export default {
        name: 'app',
        components: {
            CountryFilter,
            RmcFilter,
            Grid
        },
        data: () => ({
            items : []
        }),
        mounted() {
            this.axios.get('data/grid_data.json').then(({data}) => {
                this.items = data;
            })
        }
    }
</script>

<style>

</style>
