import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router);

//重复点击路由报错解决
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

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
        path: '/checkCompetition',
        name: '/checkCompetition',
        meta:{
            name:'查看比赛'
        },
        component: ()  => import("../views/login/checkCompetition.vue")
    },
    {
        path: '/competitionDetail',
        name: '/competitionDetail',
        meta:{
            name:'比赛详情'
        },
        component: ()  => import("../views/login/competitionDetail.vue")
    },
    {
        path: '/acceptInvitation',
        name: '/acceptInvitation',
        meta:{
            name:'接受邀请'
        },
        component: ()  => import("../views/userConsole/acceptInvitation")
    },
    {
        path: '/modifyPassword',
        name: '/modifyPassword',
        meta:{
            name:'修改密码'
        },
        component: ()  => import("../views/login/modifyPassword")
    },
    {
        path: '/forgetPassword',
        name: '/forgetPassword',
        meta:{
            name:'忘记密码'
        },
        component: ()  => import("../views/login/forgetPassword")
    },
]


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
            systemID: '参赛者',
            name:'用户中心'
        },
        component: ()  => import("../views/layout/index.vue"),
        children:[
            {
                path: '/myProject',
                name: '/myProject',
                meta:{
                    name:'我的团队',
                    icon:'el-icon-menu'
                },
                component: ()  => import("../views/userConsole/myProject")
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
                path: '/editProject',
                name: '/editProject',
                hidden:true,
                meta:{
                    name:'修改项目'
                },
                component: ()  => import("../views/userConsole/editProject")
            },
        ]
    },
    {
        path: '/adminConsole',
        name: '/adminConsole',
        meta: {
            systemID: '管理员',
            name: '管理中心'
        },
        component: () => import("../views/layout/index.vue"),
        children: [
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
                path: '/editAnnouncement',
                name: '/editAnnouncement',
                meta:{
                    name:'公告管理',
                    icon:'el-icon-tickets'
                },
                component: ()  => import("../views/adminConsole/editAnnouncement")
            },
            {
                path: '/competitionRelease',
                name: '/competitionRelease',
                meta:{
                    name:'发布比赛',
                    icon:'el-icon-date'

                },
                component: ()  => import("../views/adminConsole/competitionRelease")
            },
            {
                path: '/competitionList',
                name: '/competitionList',
                meta:{
                    name:'管理比赛列表',
                    icon:'el-icon-setting'

                },
                component: ()  => import("../views/adminConsole/competitionList")
            },
            {
                path: '/competitionList/editCompetitionInfo',
                name: '/editCompetitionInfo',
                hidden:true,
                meta:{
                    name:'比赛信息修改',
                },
                component: ()  => import("../views/adminConsole/editCompetitionInfo")
            },
            {
                path: '/commonInfo',
                name: '/commonInfo',
                meta:{
                    name:'基本信息',
                    icon:'el-icon-setting'
                },
                component: ()  => import("../views/superManager/commonInfo")
            },
        ]
    },
    {
        path: '/teacherConsole',
        name: '/teacherConsole',
        meta: {
            systemID: '老师',
            name: '老师中心'
        },
        component: () => import("../views/layout/index.vue"),
        children: [
            {
                path: '/teacherConsole/scoringWork',
                name: '/teacherConsole/scoringWork',
                meta:{
                    name:'评分中心',
                    icon:'el-icon-date'

                },
                component: ()  => import("../views/teacher/scoringWork")
            },
            {
                path: '/teacherConsole/markGroup',
                name: '/teacherConsole/markGroup',
                hidden: true,
                meta:{
                    name:'队伍打分',
                },
                component: ()  => import("../views/teacher/markGroup")
            },
        ]

    },
];

