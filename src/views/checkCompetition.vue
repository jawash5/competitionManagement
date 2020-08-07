<template>
    <div id="checkCompetition">
        <head-login :state="statement"></head-login>
        <div>
            <competition :competitionInfo="competitionInfo"></competition>
            <competition :competitionInfo="competitionInfo"></competition>
            <competition :competitionInfo="competitionInfo"></competition>
            <competition :competitionInfo="competitionInfo"></competition>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import headLogin from "@/components/headLogin";
    import myFooter from "@/components/myFooter";
    import competition from "@/components/competition";

    export default {
        name: "index",
        components:{
            "headLogin": headLogin,
            "myFooter": myFooter,
            "competition": competition
        },
        data(){
            return{
                statement:true,
                competitionInfo: {
                    name: '浙江省电子商务大赛',
                    time: '2020年7月25日',
                    request: '队伍人数三人以下',
                    type: '线上答辩',
                    discribe:'全国大学生电子商务“创新、创意及创业”挑战赛' +
                        '（以下简称“三创赛”）是由全国电子商务创新产教联盟主办' +
                        '，由“三创赛”竞赛组织委员会统一策划、组织、管理与实施' +
                        '。“三创赛”由校赛、省赛和国赛三级竞赛组成，分别由教育' +
                        '部认可的全国高校提出申请，经“三创赛”竞赛组织委员批准分' +
                        '别组成全国决赛承办单位、分省选拔赛承办单位和各参赛学校具体' +
                        '实施全国性三级学科性竞赛。'
                }
            }
        }
    }
</script>

<style scoped>
    @import "../styles/global.css";
    @import "../styles/checkCompetition/checkCompetition.css";
</style>