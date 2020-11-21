
const state = {
    avatarUrl: sessionStorage.getItem('avatar') || ''
}

const getters = {
    avatarUrl: state => state.avatarUrl
}

const mutations = {
    SET_AVATAR_URL(state, value) {
        state.avatarUrl = value;
    }
}

const actions = {
    setAvatarUrl({commit}, data) {
        return new Promise(resolve => {
            const value = data.replace('-internal')
            commit('SET_AVATAR_URL', value)
            sessionStorage.setItem('avatar', data)
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