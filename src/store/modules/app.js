import { login } from "@/api/login";
import {getUsername, removeCode, removeUsername, setCode, setUsername} from "@/utils/app";

const state = {
    roles: 0,
    code:'',
    userName: getUsername() || ''
}

const getters = {
    roles: state => state.roles,
    code: state => state.code,
}

const mutations = {
    SET_CODE(state, value) {
        state.code = value
    },
    SET_USERNAME(state, value) {
        state.userName = value
    },
    SET_ROLES(state, value) {
        state.roles = value;
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
    exit({ commit }) {
        return new Promise((resolve => {
            removeCode();
            removeUsername();
            sessionStorage.clear();
            commit('SET_USERNAME', '');
            commit('SET_CODE', '');
            commit('SET_ROLES', 0);
            resolve();
        }))
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}