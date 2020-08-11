<template>
    <div id="checkCompetition">
        <head-login :state="statement"></head-login>
        <div>
            <el-tabs v-model="activeName" tab-position="left" type="border-card" id="tabWrap" >
                <el-tab-pane label="比赛1" name="first">
                    <competition :competition-info="competitionInfo"></competition>
                </el-tab-pane>
                <el-tab-pane label="比赛2" name="second"></el-tab-pane>
                <el-tab-pane label="比赛3" name="third"></el-tab-pane>
                <el-tab-pane label="比赛4" name="fourth"></el-tab-pane>
            </el-tabs>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import headLogin from "@/components/headLogin";
    import myFooter from "@/components/myFooter";
    import competition from "@/components/competition";

    export default {
        name: "checkCompetition2",
        components:{
            "headLogin": headLogin,
            "myFooter": myFooter,
            "competition":competition
        },
        data(){
            return{
                statement:true,
                activeName:"first",
                competitionInfo: {
                    name: '浙江省电子商务大赛',
                    competitionTime: '2020年7月25日-2020年8月25日',
                    deadline:'020年7月20日',
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

<style scoped src="../styles/checkCompetition/checkCompetition.css"></style>