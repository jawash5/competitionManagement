<template>
    <div id="head_menu">
        <h1 id="login_head_title">竞赛管理系统</h1>
<!--        <el-menu router class="el-menu" :default-active="activeIndex" mode="horizontal"-->
<!--                 background-color="#409EFF" text-color="#fff" active-text-color="yellow">-->
<!--            <el-menu-item index="checkCompetition">比赛信息</el-menu-item>-->
<!--            <el-menu-item index="announcement">公告查看</el-menu-item>-->
<!--        </el-menu>-->
        <div id="head_tail">
<!--            <router-link to="myProject"><p class="router_p">XXX<br>个人中心</p></router-link>-->
<!--            <span class="head_hr"></span>-->
            <router-link to="login"><p class="router_p">退出账号</p></router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "headMenu",
        props:{
            activeIndex: String
        },
        data() {
            return {};
        }
    }
</script>

<style scoped>
    @import "../styles/global.css";
    @import "../styles/head/headMenu.css";
</style>