<template>
    <div class="loginHead">
        <span class="loginHeadTitle">竞赛管理系统</span>
        <div class="menuPlus">
            <el-popover
                    width="100"
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
                 class="pull-right"
                 router>
            <el-menu-item index="/checkCompetition">查看比赛</el-menu-item>
            <el-menu-item v-if="!state" index="/login">登录</el-menu-item>
            <el-menu-item v-if="!state" index="/register">注册</el-menu-item>
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
                if (getRole() === '参赛者') {
                    this.url = 'myProject'
                } else if (getRole() === '管理员') {
                    this.url = 'teamManagement'
                }
            }
        },
        mounted() {
            this.setUrl();
        }
    }
</script>

<style scoped>
    .loginHead {
        height: 60px;
        min-width: 1200px;
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

    .logoutButton {
        display: block;
        width: 100%;
        border: none;

    }
</style>