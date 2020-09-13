import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router);

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
//重复点击路由报错解决
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
/**
 * 默认路由
 */
export const defaultRouterMap = [
    {
        path: '/',
        redirect:'/checkCompetition',
        meta:{
            name:'首页'
        },
    },
    {
        path: '/login',
        name: 'login',
        meta:{
            name:'登录'
        },
        component: ()  => import("../views/login/login.vue")
    },
    {
        path: '/register',
        name: 'register',
        meta:{
            name:'注册'
        },
        component: ()  => import("../views/login/register.vue")
    },
    {
        path: '/loginAdmin',
        name: '/loginAdmin',
        meta:{
            name:'管理员登录'
        },
        component: ()  => import("../views/login/loginAdmin.vue")
    },
    {
        path: '/checkCompetition',
        name: '/checkCompetition',
        meta:{
            name:'查看比赛'
        },
        component: ()  => import("../views/login/checkCompetition.vue")
    }]


export default new Router({
    routes: defaultRouterMap
})


/**
 * 动态路由
 */
export const asnycRouterMap = [
    {
        path: '/userConsole',
        name: '/userConsole',
        meta:{
            systemID: 2,
            name:'用户中心'
        },
        component: ()  => import("../views/layout/index.vue"),
        children:[
            {
                path: '/viewCompetition',
                name: '/viewCompetition',
                meta:{
                    name:'查看比赛',
                    icon:'el-icon-search'
                },
                component: ()  => import("../views/userConsole/viewCompetition")
            },
            {
                path: '/competitionUser',
                name: 'competitionUser',
                hidden:true,
                meta:{
                    name:'比赛详情'
                },
                component: ()  => import("../views/userConsole/components/competitionUser.vue")
            },
            {
                path: '/myProject',
                name: '/myProject',
                meta:{
                    name:'我的项目',
                    icon:'el-icon-menu'
                },
                component: ()  => import("../views/userConsole/myProject")
            },
            {
                path: '/myMessage',
                name: '/myMessage',
                meta:{
                    name:'我的消息',
                    icon:'el-icon-document'
                },
                component: ()  => import("../views/userConsole/myMessage")
            },
            {
                path: '/personalInfo',
                name: '/personalInfo',
                meta:{
                    name:'个人信息',
                    icon:'el-icon-setting'
                },
                component: ()  => import("../views/userConsole/personalInfo")
            },
            {
                path: '/projectDetail',
                name: '/projectDetail',
                hidden:true,
                meta:{
                    name:'项目详情'
                },
                component: ()  => import("../views/userConsole/projectDetail")
            },

            {
                path: '/editProject',
                name: '/editProject',
                hidden:true,
                meta:{
                    name:'修改项目'
                },
                component: ()  => import("../views/userConsole/editProject")
            },
            {
                path: '/filesManagement',
                name: '/filesManagement',
                meta:{
                    name:'文件管理',
                    icon:'el-icon-tickets'
                },
                component: ()  => import("../views/adminConsole/filesManagement")
            },
        ]
    },
    {
        path: '/adminConsole',
        name: '/adminConsole',
        meta: {
            systemID: 2,
            name: '管理中心'
        },
        component: () => import("../views/layout/index.vue"),
        children: [{
            path: '/competitionRelease',
            name: '/competitionRelease',
            meta:{
                name:'发布比赛',
                icon:'el-icon-date'

            },
            component: ()  => import("../views/adminConsole/competitionRelease")
        },
            {
                path: '/teamManagement',
                name: '/teamManagement',
                meta:{
                    name:'队伍管理',
                    icon:'el-icon-user'
                },
                component: ()  => import("../views/adminConsole/teamManagement")
            },
            {
                path: '/gradesManagement',
                name: '/gradesManagement',
                meta:{
                    name:'成绩管理',
                    icon:'el-icon-trophy'
                },
                component: ()  => import("../views/adminConsole/gradesManagement")
            },
            {
                path: '/editAnnouncement',
                name: '/editAnnouncement',
                meta:{
                    name:'公告管理',
                    icon:'el-icon-tickets'
                },
                component: ()  => import("../views/adminConsole/editAnnouncement")
            },]

    },
]

