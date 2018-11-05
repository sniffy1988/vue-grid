<template>
    <div class="ui dimmer modals page transition" :class="{'active visible' : isActive}">
        <div class="ui standard modal transition" :class="{'active visible' : isActive}">
            <div class="header">
                {{modal.title}}
            </div>
            <div class="content">
                <p>
                    {{modal.main_question}}
                </p>
                <p>
                    {{modal.template}}
                </p>
            </div>
            <div class="actions">
                <button class="ui black deny button" @click="hideModal">
                    {{modal.button_cancel}}
                </button>
                <button class="ui positive button" @click="hideModal">
                    {{modal.button_ok}}
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