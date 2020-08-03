import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes:[
        {
            path: '/',
            redirect:'login'
        },
        {
            path: '/login',
            name: 'login',
            component: ()  => import("../views/login.vue")
        },
        {
            path: '/register',
            name: 'register',
            component: ()  => import("../views/register.vue")
        },
        {
            path: '/loginAdmin',
            name: '/loginAdmin',
            component: ()  => import("../views/loginAdmin.vue")
        },
        {
            path: '/checkCompetition',
            name: '/checkCompetition',
            component: ()  => import("../views/checkCompetition.vue")
        },
        {
            path: '/signUp',
            name: '/signUp',
            component: ()  => import("../views/signUp")
        },
        {
            path: '/announcement',
            name: '/announcement',
            component: ()  => import("../views/announcement")
        },
        {
            path: '/myProject',
            name: '/myProject',
            component: ()  => import("../views/myProject")
        },
    ]
})