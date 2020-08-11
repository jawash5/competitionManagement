<template>
    <div id="personalCenter">
        <head-login :state="statement"></head-login>
        <div id="myProject">
            <personal-menu active="myMessage"></personal-menu>
            <el-tabs type="border-card" tab-position="left" class="message">
                <el-tab-pane label="消息1" class="tabTitle"></el-tab-pane>
                <el-tab-pane label="消息2" class="tabTitle"></el-tab-pane>
                <el-tab-pane label="消息3" class="tabTitle"></el-tab-pane>
                <el-tab-pane label="消息4" class="tabTitle"></el-tab-pane>
            </el-tabs>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import headLogin from "@/components/headLogin";
    import myFooter from "@/components/myFooter";
    import personalMenu from "@/components/personalMenu";

    export default {
        name: "myMessage",
        data() {
            return{
                activeName:'create',
                statement:false
            }
        },
        components:{
            "headLogin":headLogin,
            "myFooter":myFooter,
            "personalMenu":personalMenu
        }
    }
</script>

<style scoped src="../styles/personalCenter/personalCenter.css"></style>
<style scoped src="../styles/personalCenter/myMessage.css"></style>

