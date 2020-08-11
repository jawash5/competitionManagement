<template>
    <div id="personalCenter">
        <head-login :state="statement"></head-login>
        <div id="myProject">
            <personal-menu active="myProject"></personal-menu>
            <el-tabs v-model="activeName">
                <el-tab-pane label="我创建的项目" name="create">
                    <div id="createdProject">
                        <div id="newProject" @click="gotoProjectDetail">
                            <span id="new_icon">+</span>
                            <p id="new_p">新建项目</p>
                        </div>
                        <project></project>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="我参加的项目" name="join">
                    <join-project></join-project>
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
    import project from "@/components/project";
    import joinProject from "@/components/joinProject";

    export default {
        name: "personalCenter",
        data() {
            return{
                activeName:'create',
                statement:false,
                active:'myProject'
            }
        },
        components: {
            "headLogin":headLogin,
            "myFooter":myFooter,
            "personalMenu":personalMenu,
            "project":project,
            "joinProject":joinProject
        },
        methods: {
            gotoProjectDetail: function () {
                this.$router.push("/projectDetail");
            }
        }
    }
</script>

<style scoped src="../styles/personalCenter/personalCenter.css"></style>
<style scoped src="../styles/personalCenter/myProject.css"></style>