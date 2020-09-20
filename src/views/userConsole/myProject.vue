<template>
    <div id="myProject">
        <div id="createdProject">
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

    /deep/.el-button--small {
        display: block;
        text-align: left;
    }

</style>