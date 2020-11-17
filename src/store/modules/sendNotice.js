
const state = {
    chosenGroups:''
}

const getters = {
    chosenGroups: state => state.chosenGroups
}

const mutations = {
    SET_CHOSEN_GROUPS(state, value) {
        state.chosenGroups = value
    }
}

const actions = {

}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}