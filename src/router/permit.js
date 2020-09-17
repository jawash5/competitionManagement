import router from "@/router/index";
import {getCode, removeCode, removeUsername, removeRole} from "@/utils/app";
import store from "../store/index";

const whiteRouter = ['/login', '/register', '/checkCompetition', '/loginAdmin'];

router.beforeEach((to, from, next) =>{
    if(getCode() === '0') {
        if(to.path === '/login') {
            removeCode();
            removeUsername();
            removeRole();
            sessionStorage.clear();
            store.commit('app/SET_CODE', '');
            store.commit('app/SET_USERNAME', '')
            next();
        } else {
            if(store.getters["app/roles"] === '') {
                let role = store.getters['app/trueRole'];
                store.commit('app/SET_ROLES', role);
                // eslint-disable-next-line no-unused-vars
                store.dispatch('permission/creatRouter', role).then(response => {
                    let addRouters = store.getters['permission/addRoutes'];
                    //更新路由
                    router.options.routes = store.getters['permission/allRouter'];
                    router.addRoutes(addRouters);
                    //添加动态路由
                    next({...to, replace: true});
                });

            } else {
                next();
            }
        }

    } else {
        if(whiteRouter.indexOf(to.path) !== -1) {
            next();
        } else {
            next('/login');
        }
    }
})