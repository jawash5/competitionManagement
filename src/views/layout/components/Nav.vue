<template>
    <div id="navWrap">
        <img style="width: 120px; margin: 20px auto" src="../../../assets/main/ico.png" alt="logo">
        <el-menu :default-active="childrenRoute || $route.path || active"
                 class="el-menu-vertical-demo"
                 background-color="transparent"
                 text-color="#fff"
                 active-text-color="#fff"
                 router
                 @select="defaultActive">
            <template v-for="item in routers">
                <template v-for="subItem in item.children">
                    <el-menu-item v-if="!subItem.hidden" :key="subItem.id" :index="subItem.path">
                        <i :class="subItem.meta.icon"></i>
                        <span slot="title">{{ subItem.meta.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import {getRole} from "@/utils/app";

    export default {
        name: "Nav",
        data() {
            return {
                routers: this.$router.options.routes,
            }
        },

        // watch:{
        //     session(newVal,oldVal) {
        //         this.active = newVal;
        //         console.log(oldVal)
        //     }
        // },
        //
        computed:{
            active() {
                const role = (getRole() === '参赛者' ? '/myProject' : '/teamManagement');
                return (sessionStorage.getItem("active") || role);
            },
            childrenRoute() {
                if(this.$route.path === '/editProject') {
                    return '/myProject'
                } else if(this.$route.path === '/teacherConsole/markGroup') {
                    return '/teacherConsole/scoringWork'
                } else if(this.$route.path === '/competitionList/editCompetitionInfo') {
                    return '/competitionList'
                }
                return '';
            }
        },

        methods:{
            defaultActive(index) {
                sessionStorage.setItem("active", index)
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/config.scss";
    #navWrap {
        position: fixed;
        top: 0;
        left: 0;
        width: $navMenu;
        height: 100vh;
        background-color: #344a5f;
        z-index:100;

        .avatar {
            width: 40%;
            margin: 20px auto;
        }

        /deep/.el-menu-item{
            font-size: 14px;
        }

        /deep/.el-menu-item.is-active {
            background-color: #f56c6c !important;
        }

        /deep/.el-menu {
            border-right: solid 0 #e6e6e6;
        }

    }

    @media screen and(max-width: 420px){

        /deep/ .avatar{
            display: none;
        }

        #navWrap {
            position: fixed;
            top: 0;
            left: -1000px;
            width: 35vw;
            height: 140vh;
            background-color: #344a5f;
            z-index:100;
        }
    }
</style>
