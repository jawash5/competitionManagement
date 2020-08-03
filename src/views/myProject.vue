<template>
    <div id="personalCenter">
        <head-menu></head-menu>
        <div id="myProject">
            <personal-menu></personal-menu>
            <el-tabs v-model="activeName">
                <el-tab-pane label="我创建的项目" name="create">
                        <div id="createProject">

                            <div class="newProject">
                                <span id="new_icon">+</span>
                                <p id="new_p">新建项目</p>
                            </div>
                        </div>
                </el-tab-pane>

                <el-tab-pane label="我参加的项目" name="join">

                </el-tab-pane>
            </el-tabs>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import headMenu from "@/components/headMenu.vue";
    import myFooter from "@/components/myFooter";
    import personalMenu from "@/components/personalMenu";

    export default {
        name: "personalCenter",
        data() {
            return{
                activeName:'create'
            }
        },
        components:{
            "headMenu":headMenu,
            "myFooter":myFooter,
            "personalMenu":personalMenu
        }
    }
</script>

<style scoped>
    @import "../styles/global.css";
    @import "../styles/personalCenter/personalCenter.css";
    @import "../styles/personalCenter/myProject.css";

</style>