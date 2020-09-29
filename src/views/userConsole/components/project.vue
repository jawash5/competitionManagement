<template>
    <div id="project">
        <div id="projectTop">
            <h3 id="competitionName">{{year + '年 '}}{{ competitionName }}</h3>
        </div>
        <el-divider></el-divider>
        <div id="projectBottom">
            <h4 id="teamName">队伍名称：{{ projectDetail.name }}</h4>
            <el-button type="primary" class="founderButton" @click="editMaterials">编辑资料</el-button>
            <el-button class="founderButton">删除项目</el-button>
        </div>
    </div>
</template>

<script>
    import {competitionDetail} from "@/api/login";

    export default {
        name: "project",
        props:{
            projectDetail: {
                type:Object,
                require:true,
                default: () => {
                    return {
                        "id": 0,
                        "name": "",
                        "competitionId": 0,
                        "captainId": 0
                    }
                }
            }
        },
        data() {
            return {
                competitionName:'',//比赛
                year:''//比赛年
            }
        },
        methods:{
            editMaterials() {
                this.$store.dispatch('group/setGroupId', this.projectDetail.id)
                this.$router.push({
                    path: "/editProject",
                });
            },
            //获取比赛信息
            checkCompetitionDetail(id) {
                competitionDetail(id).then( response => {
                    const competitionDetail = response.data.data;
                    this.competitionName = competitionDetail.name;
                    this.year = competitionDetail.year;
                })
            }
        },
        mounted() {
            this.checkCompetitionDetail(this.projectDetail.competitionId)
        }

    }
</script>

<style lang="scss" scoped>

    #project {
        margin: 20px;
        width: 280px;
        height: 250px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-radius: 15px;
        background-color: #f7f7f7;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    #project:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
        transition: box-shadow 0.3s;
    }

    #competitionName{
        font-size: 20px;
        color: #409EFF;
        font-family: "幼圆" , serif;
    }

    #projectTop {
        margin-top: 20px;
        padding: 0 20px;
        text-align: center;
    }

    #projectBottom {
        height: 150px;
        margin: 0 40px 20px 40px;
        text-align: center;
    }

    #teamName {
        font-size: 16px;
        color: #303133;
        font-weight: 500;
    }

    .founderButton {
        margin: 20px 0 0 0;
        display: block;
        width: 100%;
    }

</style>