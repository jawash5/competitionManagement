<template>
    <div class="loginHead">
        <span class="loginHeadTitle">竞赛管理系统</span>
        <div class="menuPlus">
            <el-popover
                    width="80"
                    trigger="hover"
                    v-if="state">
                <el-button class="logoutButton" @click="exit">退出登录</el-button>
                <el-avatar :size="40"
                           src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                           class="avatar pull-right"
                           slot="reference">
                </el-avatar>
            </el-popover>
        </div>
        <el-menu :default-active="$route.path"
                 mode="horizontal"
                 class="pull-right plus"
                 router>
            <el-menu-item index="/checkCompetition">查看比赛</el-menu-item>
            <el-menu-item v-if="!state" index="/login">登录</el-menu-item>
            <el-menu-item v-if="!state" index="/register">注册</el-menu-item>
        </el-menu>
        <el-menu :default-active="$route.path"
                 mode="horizontal"
                 class="pull-right"
                 router>
            <el-menu-item v-if="!state">
                <el-dropdown :style="{'float' : 'right' , 'right':'2vw'}">
                    <i class="el-icon-menu" :style="{'font-size' : '20px'}"></i>
                    <el-dropdown-menu slot="dropdown" :style="{'width' : '94vw'}">
                        <el-dropdown-item><router-link to="/login">登陆</router-link></el-dropdown-item>
                        <el-dropdown-item><router-link to="/register">注册</router-link></el-dropdown-item>
                        <el-dropdown-item><router-link to="/checkCompetition">查看比赛</router-link></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-menu-item>
            <el-menu-item v-if="state" :index="url">个人中心</el-menu-item>
        </el-menu>

    </div>
</template>

<script>
    import {getRole} from "@/utils/app";

    export default {
        name: "headLogin",
        data() {
            return{
                url:'',
                routerIndex: '/checkCompetition'
            }
        },
        props: {
            state: {
                type:Boolean,
                default:false
            },
        },
        methods:{
            exit() {
                this.$store.dispatch('app/exit').then(() => {
                    this.routerIndex = '/login';
                    this.$router.push({
                        path:'/login'
                    })
                }).catch( () => {
                    this.routerIndex = '/login';
                    this.$router.push({
                        path:'/login'
                    })
                })
            },
            setUrl() {
                this.routerIndex = '/checkCompetition';
                const role = getRole();
                if (role === '参赛者') {
                    this.url = '/myProject'
                } else if (role === '管理员') {
                    this.url = '/teamManagement'
                } else if (role === '老师') {
                    this.url = '/teacherConsole/scoringWork'
                }
            },
        },
        mounted() {
            this.setUrl();
        }
    }
</script>

<style scoped>
    .loginHead {
        height: 60px;
        min-width: 420px;
        min-height: 60px;
        background-color: #fff;
        box-shadow: 0 3px 16px 0 rgba(0,0,0,.1);
    }

    .loginHeadTitle {
        display: inline-block;
        padding: 0 100px;
        font-size: 24px;
        font-weight: bolder;
        font-family:"等线" , serif;
        line-height: 60px;
        color: #303133;
        cursor: default;
    }

    .menuPlus {
        float: right;
        width: 100px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .avatar {
        border: #409EFF solid 1px;
        margin-left: 10px;
    }

    .logoutButton {
        display: block;
        width: 100%;
        border: none;

    }


    @media screen and (max-width: 420px){

        .loginHead{
            min-width: 0;
        }

        .pull-right.plus{
            display: none;
        }

        i{
            float: right;
            padding: 18px;
        }

        a{
            color: #222222;
            font-weight: 600;
            font-family: 幼圆,serif;
        }

        /deep/.el-dropdown-menu__item{
            text-align: center;
            letter-spacing: 3px;
        }

        .menuPlus {
            width: 0;
        }

        .loginHeadTitle {
            display: inline-block;
            padding: 0 25px;
            font-size: 24px;
            font-weight: bolder;
            font-family:"等线" , serif;
            line-height: 60px;
            color: #303133;
            cursor: default;
        }

        /deep/ .avatar{
            position: absolute;
            left: 57vw;
            top: 1.4vh;
        }

        /deep/.popper__arrow{
            display: none;
        }

    }

    @media screen and (min-width: 421px){

        i{
            display: none;
        }

    }

</style>
