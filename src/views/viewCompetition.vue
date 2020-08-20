<template>
    <div id="personalCenter">
        <head-login :state="statement"></head-login>
        <div id="myProject">
            <personal-menu active="viewCompetition"></personal-menu>
            <el-tabs type="border-card" tab-position="left" class="message">
                <el-tab-pane label="电子商务竞赛" class="tabTitle">
                    <competition competition-name="电子商务竞赛"></competition>
                    <el-button type="primary" @click="signUp">立即报名</el-button>
                </el-tab-pane>
            </el-tabs>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import headLogin from "@/components/headLogin";
    import myFooter from "@/components/myFooter";
    import personalMenu from "@/components/personalMenu";
    import competition from "@/components/competition";

    export default {
        name: "viewCompetition",
        data() {
            return{
                activeName:'create',
                statement:false,
            }
        },
        components:{
            "headLogin":headLogin,
            "myFooter":myFooter,
            "personalMenu":personalMenu,
            "competition":competition
        },
        methods:{
            signUp:function () {
                this.$router.push({
                    path:'/projectDetail'
                })
            }
        }
    }
</script>

<style scoped src="../styles/personalCenter/viewCompetition.css"></style>
<style scoped src="../styles/personalCenter/personalCenter.css"></style>

