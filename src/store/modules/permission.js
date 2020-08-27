import { getRoles } from "@/api/login";
import { asnycRouterMap, defaultRouterMap } from "@/router";

const state = {
    roles: 0,
    addRoutes: [],
    allRouter: defaultRouterMap
}

const getters = {
    roles: state => state.roles,
    addRoutes: state => state.addRoutes,
    allRouter: state => state.allRouter
}

const mutations = {
    SET_ROLES(state, value) {
        state.roles = value;
    },
    SET_ROUTER(state, router) {
        state.addRoutes = router;
        state.allRouter = defaultRouterMap.concat(router)
    }
}

const actions = {
    /**
     * 获取用户角色
     */
    getRoles({ commit }) {
        // eslint-disable-next-line no-unused-vars
        return new Promise((resolve,reject) => {
            getRoles().then(response => {
                console.log(response.data.data[0].id);
                let role = response.data.data[0].id;
                commit('SET_ROLES', role);
                resolve(role)
            })
        })
    },

    /**
     * 创建动态路由
     */
    creatRouter({ getters,commit }){
        // eslint-disable-next-line no-unused-vars
        return new Promise((resolve, reject) => {
            let role = getters.roles;
            const addRouters = asnycRouterMap.filter( item => {
                if(role === item.meta.systemID) {
                    return item;
                }
            })
            //更新路由
            commit('SET_ROUTER', addRouters)
            resolve()
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