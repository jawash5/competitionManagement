<template>
    <div id="navWrap">
        <img alt="退出" src="../../../assets/main/logo.png" >
        <el-menu :default-active="active"
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
<!--                <el-submenu v-if="!item.hidden" :key="item.id" :index="index">-->
<!--                    <template slot="title">-->
<!--                        <i class="el-icon-location"></i>-->
<!--                        <span slot="title">{{ item.meta.name }}</span>-->
<!--                    </template>-->
<!--                    <el-menu-item v-for="subItem in item.children"-->
<!--                                  :key="subItem.id"-->
<!--                                  :index="subItem.path">-->
<!--                        {{ subItem.meta.name }}-->
<!--                    </el-menu-item>-->
<!--                </el-submenu>-->
                </template>
            </template>


<!--            <el-menu-item index="viewCompetition">-->
<!--                <i class="el-icon-search"></i>-->
<!--                <span slot="title">查看比赛</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="myProject">-->
<!--                <i class="el-icon-menu"></i>-->
<!--                <span slot="title">我的项目</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="myMessage">-->
<!--                <i class="el-icon-document"></i>-->
<!--                <span slot="title">我的消息</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="personalInfo">-->
<!--                <i class="el-icon-setting"></i>-->
<!--                <span slot="title">个人信息</span>-->
<!--            </el-menu-item>-->
        </el-menu>
    </div>
</template>

<script>
    import {getRole} from "@/utils/app";

    export default {
        name: "Nav",
        data() {
            return {
                routers: this.$router.options.routes
            }
        },

        computed:{
            active() {
                const role = (getRole() === '参赛者' ? '/viewCompetition' : '/teamManagement');
                return (sessionStorage.getItem("active") || role);
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
        z-index:9;

        img {
            width: 40%;
            margin: 20px auto;
        }
    }
</style>