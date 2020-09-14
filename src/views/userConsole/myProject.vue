<template>
    <div id="myProject">
        <div id="createdProject">
            <div id="newProject" @click="gotoProjectDetail">
                <span id="new_icon">+</span>
                <p id="new_p">新建项目</p>
            </div>
            <project v-for="(item,index) in projectDetail" :key="index" :project-detail="item"></project>
        </div>
    </div>
</template>

<script>
    import project from "@/views/userConsole/components/project";
    import {checkGroup} from "@/api/userConsole";

    export default {
        name: "personalCenter",
        data() {
            return{
                activeName:'create',
                leader:'',
                projectDetail: []
            }
        },
        components: {
            "project": project,
            // "joinProject":joinProject
        },
        methods: {
            gotoProjectDetail() {
                this.$router.push({
                    path: "/projectDetail",
                });
            },
            checkGroup() {
                checkGroup().then(response => {
                    this.projectDetail = response.data.data;
                    // console.log(this.projectDetail)
                })
            }
        },
        mounted() {
            this.checkGroup();
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