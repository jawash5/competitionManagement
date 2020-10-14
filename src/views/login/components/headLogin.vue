<template>
    <div id="login_head">
        <span id="login_head_title">竞赛管理系统</span>
        <div class="menuPlus">
            <el-menu :default-active="$route.path"
                     mode="horizontal"
                     class="menu"
                     router
                     background-color="#409EFF"
                     text-color="#fff"
                     active-text-color="#ffd04b">
                <el-menu-item index="/checkCompetition">查看比赛</el-menu-item>
                <el-menu-item v-if="!state" index="/login">登录</el-menu-item>
                <el-menu-item v-if="!state" index="/register">注册</el-menu-item>
                <el-menu-item v-if="state" :index="url">个人中心</el-menu-item>
            </el-menu>

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
    #login_head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        min-width: 1200px;
        min-height: 60px;
        background-color: #409EFF;
        box-shadow: 0 3px 16px 0 rgba(0,0,0,.1);
    }

    #login_head_title {
        display: inline-block;
        font-size: 24px;
        font-family:"等线" , serif;
        color: #f2f2f2;
        padding: 0 100px;
        cursor: default;
        font-weight: bolder;
    }

    .menuPlus {
        display: flex;
        align-items: center;
        justify-content: space-around;

    }

    .menu {
        margin-right: 50px;
    }

    .avatar {
        margin-right: 50px;
    }

    .logoutButton {
        display: block;
        width: 100%;
        border: none;

    }
</style>