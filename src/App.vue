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

    export default {
        name: 'app',
        components: {
            Grid,
            GridFilter
        },
        data: () => ({
            items: []
        }),
        computed: {
            countriesItems() {
                return this.items.map((item) => {
                    return item.country
                })
            },
            rmcItems() {
                return this.items.map((item) => {
                    return item.RMC;
                })
            }
        },
        mounted() {
            this.axios.get('data/grid_data.json').then(({data}) => {
                this.items = data;
            })
        }
    }
</script>

<style>

</style>
