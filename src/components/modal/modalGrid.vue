<template>
    <div class="ui dimmer modals page transition" :class="{'active visible' : isActive}">
        <div class="ui standard modal transition" :class="{'active visible' : isActive}">
            <div class="header">
                Confirmation
            </div>
            <div class="content">
                {{modal}}
            </div>
            <div class="actions">
                <button class="ui black deny button" @click="hideModal">
                    Cancel
                </button>
                <button class="ui positive button" @click="hideModal">
                    Yes
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        name: 'Modal',
        computed: {
            ...mapState('modal', {
                isActive: ({isActive}) => isActive,
                modal: ({modal}) => modal
            })
        },
        methods: {
            ...mapActions({
                hideModal: 'changeModal'
            })
        }
    }
</script>