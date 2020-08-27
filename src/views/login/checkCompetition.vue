<template>
    <div id="checkCompetition">
        <head-login :state="true"></head-login>
        <div class="competitionList">
            <competition-card competition-name="电子商务竞赛">
            </competition-card>
            <competition-card v-for="item in competitionList"
                              :key="item.id"
                              :competition-name="item">
            </competition-card>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import {competitionList} from "@/api/login";
    import headLogin from "@/views/login/components/headLogin";
    import myFooter from "@/views/login/components/myFooter";
    // import competition from "@/components/competition";
    import competitionCard from "@/views/login/components/competitionCard";

    export default {
        name: "checkCompetition",
        components:{
            "headLogin": headLogin,
            "myFooter": myFooter,
            // "competition":competition
            "competitionCard":competitionCard
        },
        data(){
            return{
                competitionList:[]
            }
        },
        methods: {
            getCompetitionList:function () {
                competitionList().then(response => {
                    this.competitionList = response.data.data
                }).catch(error => {
                    this.$message.error('服务器开小差啦~');
                    console.log(error);
                });
            }
        },
        mounted() {
            this.getCompetitionList()
        }
    }
</script>

<style lang="scss" scoped>
    #checkCompetition {
        background-color: #f2f2f2;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 1200px;
        min-height: 800px;
    }

    .competitionList {
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;
        height: 650px;
    }

    /deep/.el-tabs__item {
        font-family: "幼圆" , serif;
        width: 200px;
        height: 60px;
        font-size: 18px;
    }

    /deep/.el-tabs__nav-next {
        display: block;
        text-align: left;
    }

    /deep/.el-tabs__nav-prev{
        display: block;
        text-align: left;
    }

</style>