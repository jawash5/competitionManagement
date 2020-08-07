<template>
    <div id="personal_menu">
        <el-menu
                router
                default-active="myProject"
                class="el-menu-vertical-demo">
            <el-menu-item index="myProject">
                <i class="el-icon-menu"></i>
                <span slot="title">我的项目</span>
            </el-menu-item>
            <el-menu-item index="myMessage">
                <i class="el-icon-document"></i>
                <span slot="title">我的消息</span>
            </el-menu-item>
            <el-menu-item index="personalInfo">
                <i class="el-icon-setting"></i>
                <span slot="title">个人信息</span>
            </el-menu-item>
        </el-menu>
        <router-link to="checkCompetition" id="exit">退出账号</router-link>
    </div>
</template>

<script>
    export default {
        name: "personalMenu",
    }
</script>

<style scoped>
    @import "../styles/global.css";

    #personal_menu {
        width: 150px;
        height: 80vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #FFFFFF;
        margin: 0 20px;
        border-radius: 2px;
    }

    #exit {
        font-size: 14px;
        font-family: "等线" , serif;
        margin-bottom: 20px;
        text-decoration: none;
    }

</style>