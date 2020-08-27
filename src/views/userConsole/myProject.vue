<template>
    <div id="myProject">
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
</template>

<script>
    import project from "@/views/userConsole/components/project";
    import joinProject from "@/components/joinProject";

    export default {
        name: "personalCenter",
        data() {
            return{
                activeName:'create',
            }
        },
        components: {
            "project":project,
            "joinProject":joinProject
        },
        methods: {
            gotoProjectDetail: function () {
                this.$router.push({
                    path: "/projectDetail",
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    #myProject {
        display: flex;
        flex-direction: row;
    }

    .el-tabs__item {
        font-size: 16px;
    }

    #createdProject {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    #newProject {
        margin: 10px 10px;
        width: 280px;
        height: 250px;
        border-radius: 2px;
        text-align: center;
        cursor: pointer;
        background-color: #f7f7f7;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    #newProject:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
        transition: box-shadow 0.3s;
    }

    /deep/.el-button--small {
        display: block;
        text-align: left;
    }

    #new_icon {
        font-size: 150px;
        margin: 0 auto;
        color: #dcdcdc;
    }

    #new_p {
        font-size: 16px;
        color: #999;
    }
</style>