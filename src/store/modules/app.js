import { login } from "@/api/login";
import { getUsername, setCode, setUsername } from "@/utils/app";

const state = {
    code:'',
    userName: getUsername() || ''
}

const getters = {
}

const mutations = {
    SET_CODE(state, value) {
        state.code = value
    },
    SET_USERNAME(state, value) {
        state.userName = value
    },
}

const actions = {
    login({ commit }, data) {
        return new Promise((resolve, reject) => {
            login(data).then(response => {
                commit('SET_USERNAME', data.get('username'));
                setUsername(data.get('username'));
                let code = response.data.code;
                commit('SET_CODE', code);
                setCode(code);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}