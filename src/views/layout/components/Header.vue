<template>
    <div id="headWrap">
        <div class="close">
            <el-popover
                    width="50"
                    trigger="hover">
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
                 style="display: inline-block;"
                 router>
            <el-menu-item index="/checkCompetition">查看比赛</el-menu-item>
        </el-menu>
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
        min-width: 420px;
        background-color: #fff;
        z-index: 1000;
        box-shadow: 0 3px 16px 0 rgba(0,0,0,.1);
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
        width: 100px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    @media screen and (max-width: 420px){

        #headWrap {
            position: fixed;
            top: 0;
            left: 0;
            height: 60px;
            min-width: 0;
            background-color: #fff;
            z-index: 1000;
            box-shadow: 0 3px 16px 0 rgba(0,0,0,.1);
        }

        .avatar {
            position: absolute;
            top: 10px;
            left: 10vw;
            margin-left: 0;
            border: #409EFF solid 1px;
        }

        .close {
            width: 20px;
        }

    }

</style>
