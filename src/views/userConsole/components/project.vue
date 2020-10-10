<template>
    <div id="project">
        <div id="projectTop">
            <span class="title2"
                  v-if="competitionDetail.hasOwnProperty('year')">{{competitionDetail.year + '年 '}}</span>
            <span class="title2"
                v-if="competitionDetail.hasOwnProperty('session')">{{ '第 ' + competitionDetail.session + ' 届'}}</span>
            <h3 class="competitionName">{{ competitionDetail.name }}</h3>
        </div>
        <el-divider></el-divider>
        <div id="projectBottom">
            <h4 id="teamName">队伍名称：{{ projectDetail.name }}</h4>
            <div class="div-30"></div>
            <el-button type="primary" class="checkInfo" @click="editMaterials">查看资料</el-button>
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
                        id: '',
                        name: '',
                        competitionId: '',
                        captainId: '',
                        session: ''
                    }
                }
            }
        },
        data() {
            return {
                competitionDetail:JSON.parse(sessionStorage.getItem(this.projectDetail.competitionId)) || '',//比赛
            }
        },
        methods:{
            //点击编辑后事件
            editMaterials() {
                this.$store.dispatch('group/setGroupId', this.projectDetail.id)
                this.$router.push({
                    path: "/editProject",
                });
            },
            //获取比赛信息
            checkCompetitionDetail(id) {
                competitionDetail(id).then( response => {
                    this.competitionDetail = response.data.data;
                    sessionStorage.setItem(id, JSON.stringify(this.competitionDetail))
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
        border-radius: 15px;
        background-color: #f7f7f7;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    #project:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
        transition: box-shadow 0.3s;
    }

    .competitionName{
        font-size: 20px;
        color: #409EFF;
        font-family: "幼圆" , serif;
        margin-top: 10px;
    }

    .title2 {
        margin-top: 10px;
        color: #409EFF;
        font-size: 18px;
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
        color: #303133;
        font-size: 16px;
        font-weight: 500;
    }

    .checkInfo {
        margin: 20px 0 0 0;
        display: block;
        width: 100%;
    }

</style>