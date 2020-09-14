import {setGroupId, getGroupId} from '@/utils/app'

const state = {
    groupId : getGroupId() || 0
}

const getters = {
    groupId: state => state.groupId
}

const mutations = {
    SET_GROUP_ID(state, value) {
        state.groupId = value
    }
}

const actions = {
    setGroupId({commit},data) {
        return new Promise(((resolve) => {
            commit('SET_GROUP_ID', data)
            setGroupId(data)
            return resolve
        }))
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}