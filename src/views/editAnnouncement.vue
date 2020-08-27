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
    import headLogin from "@/views/login/components/headLogin";
    import myFooter from "@/views/login/components/myFooter";
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

<style lang="scss" scoped>

    #adminManagement {
        background-color: #f2f2f2;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 1200px;
        min-height: 700px;
    }

    #wrap {
        background-color: #f2f2f2;
        padding: 50px 0;
        display: flex;
        flex-direction: row;
    }

    #tabWrap {
        width: 1050px;
        min-width: 1050px;
        height: 600px;
        margin: 0 auto;
    }

    /deep/.el-form-item__content {
        text-align: left;
        line-height: 40px;
        position: relative;
        font-size: 14px;
    }

    /deep/.el-tabs__item {
        width: 150px;
        padding: 0 20px;
        height: 60px;
        box-sizing: border-box;
        line-height: 40px;
        display: inline-block;
        list-style: none;
        font-size: 14px;
        font-weight: 500;
        color: #303133;
        position: relative;
    }

    /deep/.el-tabs__nav .is-left {
        width: 150px;
    }

</style>