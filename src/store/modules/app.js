import { login,logout } from "@/api/login";
import { removeCode, setCode, setRole, getRole, removeRole} from "@/utils/app";

const state = {
    roles: '',
    trueRole: getRole() || '',
    code:'',
}

const getters = {
    roles: state => state.roles,
    code: state => state.code,
    trueRole: state => state.trueRole,
}

const mutations = {
    SET_CODE(state, value) {
        state.code = value
    },
    SET_ROLES(state, value) {
        state.roles = value;
    },
    SET_TRUE_ROLES(state, value) {
        state.trueRole = value;
    },
}

const actions = {
    login({ commit }, data) {
        return new Promise((resolve, reject) => {
            login(data).then(response => {
                let code = response.data.code;
                commit('SET_CODE', code);
                setCode(code);
                commit('SET_TRUE_ROLES', response.data.data);
                setRole(response.data.data);
                resolve(state.trueRole)
            }).catch(error => {
                reject(error)
            })
        })
    },
    exit({ commit }) {
        return new Promise((resolve,reject) => {
            logout().then( response => {
                removeCode();
                removeRole();
                sessionStorage.clear();
                commit('SET_CODE', '');
                commit('SET_ROLES', '');
                resolve(response);
            }).catch( error => {
                removeCode();
                removeRole();
                sessionStorage.clear();
                commit('SET_CODE', '');
                commit('SET_ROLES', '');
                reject(error);
            })
        })
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}