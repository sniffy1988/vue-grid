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
                items: 'grid'
            }),
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
        mounted(){
            this.$store.dispatch('loadGrid');
        }
    }
</script>

<style>

</style>
