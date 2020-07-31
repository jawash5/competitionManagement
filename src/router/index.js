import Vue from 'vue';
import Router from 'vue-router'
import index from "../views/index.vue";
import login from "@/views/login";

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
            component: login
        },
    ]
})