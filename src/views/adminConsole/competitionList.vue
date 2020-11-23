<template>
    <div class="competitionList">
        <competition-card v-for="item in competitionList"
                          :key="item.id"
                          :competition="item">
            <el-button class="btns"
                       slot="footer"
                       type="primary"
                       round
                       size="small"
                       @click="editInfo(item.id)">修改信息</el-button>
        </competition-card>
    </div>
</template>

<script>
    import competitionCard from "@/views/login/components/competitionCard";
    import {competitionList} from "@/api/login";
    export default {
        name: "competitionList",
        components:{competitionCard},
        data() {
            return {
                competitionList:JSON.parse(sessionStorage.getItem('competitionList')) || [],
            }
        },
        methods: {
            //获取管理员管理的比赛列表
            getCompetitionList() {
                if (this.competitionList.length === 0 ) {
                    competitionList().then(response => {
                        this.competitionList = response.data.data
                        sessionStorage.setItem('competitionList', JSON.stringify(this.competitionList))
                    }).catch( error => {
                        this.$message.error(error.response.data);
                    });
                }
            },
            //修改比赛信息
            editInfo(competitionId) {
                this.$router.push({
                    path:'/competitionList/editCompetitionInfo',
                    query:{
                        id: competitionId
                    }
                })
            }
        },
        mounted() {
            this.getCompetitionList();
        }

    }
</script>

<style lang="scss" scoped>
    .competitionList {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: flex-start;

        .btns {
            display: block;
            margin: 0 auto;
        }
    }

    @media screen and (max-width: 1400px) {
        .card {
            margin: 1.5 * 16px calc((100% - 45 * 16px) / 6);
        }
    }

    @media screen and (max-width: 1100px) {
        .card {
            margin: 1.5 * 16px calc((100% - 30 * 16px) / 4);
        }
    }

    @media screen and (max-width: 850px) {
        .card {
            margin: 1.5 * 16px calc((100% - 15 * 16px) / 2);
        }
    }
</style>