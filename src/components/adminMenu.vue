<template>
    <div id="personal_menu">
        <el-menu
                router
                :default-active = "active"
                class="el-menu-vertical-demo">
            <el-menu-item index="competitionRelease">
                <i class="el-icon-date"></i>
                <span slot="title">发布赛事</span>
            </el-menu-item>
            <el-menu-item index="teamManagement">
                <i class="el-icon-user"></i>
                <span slot="title">队伍操作</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-tickets"></i>
                    <span>公告管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="editAnnouncement">公告查看</el-menu-item>
                    <el-menu-item index="releaseAnnouncement">新建公告</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="gradesManagement">
                <i class="el-icon-trophy"></i>
                <span slot="title">成绩发布</span>
            </el-menu-item>
        </el-menu>
        <router-link to="checkCompetition" id="exit">退出账号</router-link>
    </div>
</template>

<script>
    export default {
        name: "adminMenu",
        props:{
            active: String
        }
    }
</script>

<style scoped>

    #personal_menu {
        width: 180px;
        height: 600px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #FFFFFF;
        margin: 0 20px;
        border-radius: 2px;
        min-height: 600px;
        min-width: 180px;
    }

    #exit {
        font-size: 14px;
        font-family: "等线" , serif;
        margin-bottom: 20px;
        text-decoration: none;
    }

</style>