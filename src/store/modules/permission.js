
import { asnycRouterMap, defaultRouterMap } from "@/router";

const state = {
    addRoutes: [],
    allRouter: defaultRouterMap
}

const getters = {
    addRoutes: state => state.addRoutes,
    allRouter: state => state.allRouter
}

const mutations = {
    SET_ROUTER(state, router) {
        state.addRoutes = router;
        state.allRouter = defaultRouterMap.concat(router)
    }
}

const actions = {
    /**
     * 创建动态路由
     */
    creatRouter({ commit }, data){
        return new Promise((resolve) => {
            let role = data;
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