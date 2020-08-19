<template>
    <div id="adminManagement">
        <head-login></head-login>
        <div id="wrap">
            <admin-menu active="editAnnouncement"></admin-menu>

                <el-tabs v-model="activeName" tab-position="left" type="border-card" id="tabWrap">
<!--                    <el-tab-pane v-for="(item, index) in announcementContent" :key="index" :label="item.name" name="index">-->
<!--                        <announcement announcementName="item.name"></announcement>-->
<!--                    </el-tab-pane>-->
                    <el-tab-pane label="公告名">
                        <announcement announcementName="item.name"></announcement>
                        <el-button type="primary" @click="deleteAnnouncement">删除</el-button>
                        <el-button @click="topping">置顶</el-button>
                    </el-tab-pane>
                </el-tabs>

        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import headLogin from "@/components/headLogin";
    import myFooter from "@/components/myFooter";
    import adminMenu from "@/components/adminMenu";
    import announcement from "@/components/announcement";

    export default {
        name: "editAnnouncement",
        components: {
            'headLogin': headLogin,
            'myFooter': myFooter,
            'adminMenu':adminMenu,
            'announcement':announcement
        },
        data() {
            return{
                activeName:'',
                announcementContent:{}
            }
        },
        methods:{
            deleteAnnouncement:function () {
                console.log('11')
            },
            topping:function () {
                console.log('22')
            }
        }
    }
</script>

<style scoped src="../styles/adminManagement/editAnnouncement.css">

</style>