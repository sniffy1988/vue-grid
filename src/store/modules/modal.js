import getModal from '../../helpers/fetchModal';


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
        },
        setModal(state, payload) {
            state.modal = payload;
        }
    },
    actions: {
        changeModal: {
            root: true,
            handler({dispatch}, payload) {
                dispatch('getModalStrings', payload);
            }
        },
        async getModalStrings({commit}, payload) {
            const result = await getModal;
            if (result.status === 200) {
                let {data} = result;
                let {templated_string} = result.data;
                templated_string = templated_string.replace('#RMC_STRING#', `rmc: ${payload.rmc}`);
                templated_string = templated_string.replace('#PRICE_STRING#', '$1250');
                console.log('templated_string: ', templated_string);
                data.template = templated_string;
                commit('changeModal');
                commit('setModal', data);
            }
        }
    }
};

export default modal;