
const state = {
    competitionInfo: sessionStorage.getItem('competitionInfo') || ''
}

const getters = {
    competitionInfo: state => state.competitionInfo
}

const mutations = {
    SET_COMPETITION_INFO(state, value) {
        state.competitionInfo = value;
    }
}

const actions = {
    setCompetitionInfo({commit}, data) {
        return new Promise(resolve => {
            commit('SET_COMPETITION_INFO', data)
            return resolve();
        })
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}