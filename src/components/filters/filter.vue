<template>
    <div class="field">
        <label>
            {{name}}
        </label>
        <select @change="handleChange">
            <option value="">All {{labelName}}</option>
            <option v-for="option in opts" :key="option.guid" :value="option.value">{{option.name}}</option>
        </select>
    </div>
</template>

<script>
    import plularize from 'pluralize';
    import countylist from 'country-list';
    import guid from '../../helpers/guid';
    import uniq from 'lodash/uniq';

    export default {
        name: 'GridFilter',
        props: {
            name: {
                type: String,
                required: true
            },
            options: {
                type: Array,
                required: true
            }
        },
        computed: {
            labelName() {
                return plularize(this.name);
            },
            opts() {
                let uniqArray = uniq(this.options);

                if (this.name.toLowerCase() === 'country') {
                    return uniqArray.map((item) => {
                        return {
                            guid: guid(),
                            value: item,
                            name: countylist().getName(item)
                        }
                    })
                } else {
                    return uniqArray.map((item) => {
                        return {
                            guid: guid(),
                            name: item,
                            value: item
                        }
                    })
                }
            }
        },
        methods: {
            handleChange({target}) {
                const {value} = target;
                this.$store.dispatch({
                    type: 'addFilter',
                    value,
                    name: this.name
                });
            }
        }
    }
</script>

<style scoped>
    .field {
        margin-right: 10px;
    }
</style>