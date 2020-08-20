<template>
    <div id="personal_menu">
        <el-menu
                router
                :default-active="active"
                class="el-menu-vertical-demo">
            <el-menu-item index="viewCompetition">
                <i class="el-icon-search"></i>
                <span slot="title">查看比赛</span>
            </el-menu-item>
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
        data(){
            return {}
        },
        props:{
            active:String
        }
    }
</script>

<style scoped>
    #personal_menu {
        width: 150px;
        height: 600px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #FFFFFF;
        margin: 0 20px;
        border-radius: 2px;
        min-height: 600px;
        min-width: 150px;
    }

    #exit {
        font-size: 14px;
        font-family: "等线" , serif;
        margin-bottom: 20px;
        text-decoration: none;
    }

</style>