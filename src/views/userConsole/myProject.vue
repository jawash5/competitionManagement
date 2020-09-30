<template>
    <div id="myProject">
        <div id="createdProject">
            <project v-for="(item,index) in projectDetail"
                     :key="index"
                     :project-detail="item"></project>
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
                leader:'',//队长名称
                projectDetail: JSON.parse(sessionStorage.getItem('projectDetail')) || [],
                competitionName:'',//比赛名称
                reFleshIcon:'el-icon-refresh-right pull-right'
            }
        },
        components: {
            "project": project,
        },
        computed:{
        },
        methods: {
            checkGroup() {
                if(this.projectDetail.length === 0) {
                    checkGroup().then(response => {
                        this.projectDetail = response.data.data;
                        sessionStorage.setItem('projectDetail', JSON.stringify(this.projectDetail));
                    }).catch(error => {
                        this.$message.error(error.response.data);
                    })
                }
            },


            // reFlesh() {
            //     this.reFleshIcon = 'el-icon-loading pull-right'
            //     checkGroup().then(response => {
            //         this.projectDetail = response.data.data;
            //         this.reFleshIcon = 'el-icon-refresh-right pull-right';
            //         sessionStorage.setItem('projectDetail', JSON.stringify(this.projectDetail));
            //         // console.log(this.projectDetail)
            //     }).catch(error => {
            //         this.$message.error(error.response.data);
            //         this.reFleshIcon = 'el-icon-refresh-right pull-right';
            //     })
            // }
        },
        mounted() {
            this.checkGroup();
        }
    }
</script>

<style lang="scss" scoped>

    .el-icon-refresh-right {
        font-size: 28px;
    }

    .el-icon-loading {
        font-size: 28px;
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