<template>
    <div id="head">
        <h1 id="login_head_title">竞赛管理系统</h1>
        <el-menu router class="el-menu" :default-active="activeIndex" mode="horizontal"
                 background-color="#409EFF" text-color="#fff" active-text-color="yellow">
            <el-menu-item index="checkCompetition">比赛信息</el-menu-item>
            <el-menu-item index="3">竞赛报名</el-menu-item>
            <el-menu-item index="4">公告查看</el-menu-item>
<!--            <el-submenu index="2">-->
<!--                <template slot="title">我的</template>-->
<!--                <el-menu-item index="2-1">个人信息</el-menu-item>-->
<!--                <el-menu-item index="2-2">团队信息</el-menu-item>-->
<!--                <el-menu-item index="2-3">作品提交</el-menu-item>-->
<!--                <el-menu-item index="4">成绩查看</el-menu-item>-->
<!--            </el-submenu>-->
        </el-menu>
        <div id="head_tail">
            <router-link to="login"><p class="router_p">XXX<br>个人中心</p></router-link>
            <span class="head_hr"></span>
            <router-link to="login"><p class="router_p">退出账号</p></router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "headMenu",
        data() {
            return {
                activeIndex: 'checkCompetition'
            };
        }
    }
</script>

<style scoped>
    @import "../styles/global.css";
    @import "../styles/head/headMenu.css";
</style>