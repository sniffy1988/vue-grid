<template>
    <td>{{item | cellType(this.type)}}</td>
</template>

<script>
    import countylist from 'country-list';

    export default {
        name: 'Cell',
        props: {
            item: null,
            type: String
        },
        filters: {
            cellType(value, type) {
                switch (type) {
                    case 'country':
                        return countylist().getName(value);
                    default :
                        return value;
                }
            }
        }
    }
</script>