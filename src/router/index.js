import Vue from 'vue';
import Router from 'vue-router'
import index from "../views/index.vue";

Vue.use(Router);

export default new Router({
    routes:[
        {
            path: '/',
            redirect:'index'
        },
        {
            path: '/index',
            name: 'index',
            component: index
        },
        {
            path: '/login',
            name: 'login',
            component: ()  => import("../views/login.vue")
        },
        {
            path: '/headLogin',
            name: 'headLogin',
            component: ()  => import("../components/headLogin.vue")
        },
        {
            path: '/footer',
            name: 'footer',
            component: ()  => import("../components/footer.vue")
        },
    ]
})