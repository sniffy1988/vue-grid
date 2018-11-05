const modal = {
    namespaced: true,
    state: {
        isActive: false,
        modal: {}
    },
    getters: {
        isActive: ({isActive}) => isActive,
        modal: ({modal}) => modal
    },
    mutations: {
        changeModal(state) {
            state.isActive = !state.isActive;
        }

    },
    actions: {
        changeModal : {
            root: true,
            handler({commit}) {
                commit('changeModal');
            }
        }
    }
};

export default modal;