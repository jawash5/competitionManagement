<template>
    <div id="myProject">
        <div id="createdProject">
            <project v-for="(item,index) in groupList"
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
                groupList: JSON.parse(sessionStorage.getItem('groupList')) || [],
                competitionName:'',//比赛名称
            }
        },
        components: {
            "project": project,
        },
        computed:{
        },
        methods: {
            checkGroup() {
                if(this.groupList.length === 0) {
                    checkGroup().then(response => {
                        this.groupList = response.data.data;
                        sessionStorage.setItem('groupList', JSON.stringify(this.groupList));
                    }).catch(error => {
                        this.$message.error(error.response.data);
                    })
                }
            },
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