<template>
    <div id="myProject">
        <competition-card-user :competition="competition"></competition-card-user>
        <competition-card-user v-for="item in competitionList"
                          :key="item.id"
                          :competition="item">
        </competition-card-user>
    </div>
</template>

<script>
    import competitionCardUser from "@/views/userConsole/components/competitionCardUser";
    import {competitionList} from "@/api/login";

    export default {
        name: "viewCompetition",
        data() {
            return{
                competition:{name:'电子商务竞赛', start:'2020/01/01', end:'2020/01/01'},
                competitionList:[],
            }
        },
        components:{ competitionCardUser },
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
    .message {
        width: 1200px;
        margin: 0 auto;
    }

    /deep/.el-tabs__item {
        font-family: "幼圆" , serif;
        width: 180px;
        height: 50px;
        font-size: 16px;
    }

</style>

