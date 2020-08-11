import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes:[
        {
            path: '/',
            redirect:'checkCompetition'
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
            path: '/projectDetail',
            name: '/projectDetail',
            component: ()  => import("../views/projectDetail")
        },
        {
            path: '/announcement',
            name: '/announcement',
            component: ()  => import("../views/myMessage")
        },
        {
            path: '/myProject',
            name: '/myProject',
            component: ()  => import("../views/myProject")
        },
        {
            path: '/myMessage',
            name: '/myMessage',
            component: ()  => import("../views/myMessage")
        },
        {
            path: '/personalInfo',
            name: '/personalInfo',
            component: ()  => import("../views/personalInfo")
        },
        {
            path: '/competitionRelease',
            name: '/competitionRelease',
            component: ()  => import("../views/competitionRelease")
        },
        {
            path: '/teamManagement',
            name: '/teamManagement',
            component: ()  => import("../views/teamManagement")
        },
        {
            path: '/gradesManagement',
            name: '/gradesManagement',
            component: ()  => import("../views/gradesManagement")
        },
        {
            path: '/releaseAnnouncement',
            name: '/releaseAnnouncement',
            component: ()  => import("../views/releaseAnnouncement")
        },
    ]
})