import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import app from './modules/app'
import login from './modules/login'
import permission from './modules/permission'
import group from "./modules/group";

export default new Vuex.Store({
    modules:{
        app,
        login,
        permission,
        group
    }
});