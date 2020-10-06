<template>
    <div id="login_head">
        <h1 id="login_head_title">竞赛管理系统</h1>
        <div class="rooter" v-if="!state">
            <router-link to="login" class="router_url">登录</router-link>
            <router-link to="checkCompetition" class="router_url avatar">查看比赛</router-link>
        </div>

        <div class="rooter" v-if="state">
<!--            <router-link to="" class="router_url">消息</router-link>-->
            <router-link :to="url" class="router_url">个人中心</router-link>
            <el-popover
                    width="100"
                    trigger="hover">
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
                url:''
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
                    this.$router.push({
                        path:'/login'
                    })
                }).catch( () => {
                    this.$router.push({
                        path:'/login'
                    })
                })
            },
            setUrl() {
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
        background-color: #409EFF;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 1200px;
        min-height: 60px;
    }

    #login_head_title {
        font-size: 24px;
        font-family:"等线" , serif;
        color: #f2f2f2;
        padding: 0 100px;
        cursor: default;
        font-weight: bolder;
    }

    .avatar {
        margin-left: 10px;
        margin-right: 50px;
    }

    .logoutButton {
        display: block;
        width: 100%;
        border: none;

    }

    a:hover {
        color: yellow;
    }

    .router_url {
        font-family:"等线" , serif;
        color: white;
        padding: 0 10px;
        font-size: 14px;
        line-height: 40px;
    }
</style>