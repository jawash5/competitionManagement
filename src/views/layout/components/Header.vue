<template>
    <div id="headWrap">
        <div class="close">
            <div class="userInfo">
                {{ username }}，您好！
            </div>
            <el-popover
                    width="50"
                    trigger="hover">
                <el-button class="logoutButton" @click="checkCompetition">查看比赛</el-button>
                <el-divider class="el-divider"></el-divider>
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
    export default {
        name: "Header",
        data() {
            return{

            }
        },
        methods:{
            exit() {
                this.$store.dispatch('app/exit').then(() => {
                    this.$router.push({
                        path:'/login'
                    })
                }).catch(() => {
                    this.$router.push({
                        path:'/login'
                    })
                })
            },
            checkCompetition() {
                this.$router.push({
                    path:'/checkCompetition'
                })
            }
        },
        computed:{
            username: function (){
                return this.$store.state.app.userName;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/config.scss";

    #headWrap {
        position: fixed;
        top: 0;
        right: 0;
        left: $navMenu;
        height: 60px;
        background-color: #fff;
        z-index: 1000;
        -webkit-box-shadow: 0 3px 16px 0 rgba(0,0,0,.1);
        min-width: 1000px;
    }

    .logoutButton {
        display: block;
        width: 100%;
        border: none;
    }

    .el-divider {
        margin: 0;
    }

    .avatar {
        margin-left: 10px;
        margin-right: 50px;
        border: #409EFF solid 1px;
    }

    .close {
        float: right;
        width: 250px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .userInfo {
            margin: 0 auto;
        }

    }


</style>