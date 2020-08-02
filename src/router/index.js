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
            path: '/headLogin',
            name: 'headLogin',
            component: ()  => import("../components/headLogin.vue")
        },
        {
            path: '/footer',
            name: 'footer',
            component: ()  => import("../components/footer.vue")
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
            path: '/headMenu',
            name: '/headMenu',
            component: ()  => import("../components/headMenu.vue")
        },
    ]
})