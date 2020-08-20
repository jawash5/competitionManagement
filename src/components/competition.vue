<template>
    <div id="competition">
        <h1 id="competitionName">比赛名称:&nbsp;&nbsp;&nbsp;&nbsp;{{ competitionName }}</h1>
        <div id="competitionDetail">
            <p><span class="subTitle">比赛时间：</span>{{ competitionInfo.competitionTime }}</p>
            <el-divider direction="vertical"></el-divider>
            <p><span class="subTitle">报名截止时间：</span>{{ competitionInfo.deadline }}</p>
        </div>
        <el-divider></el-divider>
        <div>
            <p class="competitionDisc"><span class="subTitle">比赛要求：</span>{{ competitionInfo.request }}</p>
            <p class="competitionDisc"><span class="subTitle">赛事简介：</span>{{ competitionInfo.disc }}</p>
        </div>
<!--        <el-button class="signUpButton" @click="gotoSignUp">报名</el-button>-->
    </div>
</template>

<script>

    export default {
        name: "competition",
        props:{
          competitionName: String,
        },
        data() {
            return {
                competitionInfo:{
                    competitionTime:'2020/08/08-2020/08/08',
                    deadline:'2020/08/08-2020/08/08',
                    request:'三人一下',
                    disc:'全国大学生电子商务“创新、创意及创业”挑战赛（以下简称“三创赛”）' +
                        '是由全国电子商务创新产教联盟主办，由“三创赛”竞赛组织委员会统一策' +
                        '划、组织、管理与实施。“三创赛”由校赛、省赛和国赛三级竞赛组成，分别' +
                        '由教育部认可的全国高校提出申请，经“三创赛”竞赛组织委员批准分别组成' +
                        '全国决赛承办单位、分省选拔赛承办单位和各参赛学校具体实施全国性三级学科性竞赛。'
                }
            }
        },
        methods:{
            // gotoSignUp:function () {
            //     this.$router.push("/projectDetail");
            // }
        },

        mounted: {
            // getcompetition(this.competitionName).then(response => {
            //     this.competitionInfo = response.data;
            // }).catch(error => {
            //     console.log(error)
            // })
        }
    }
</script>

<style scoped>
    #competition{
        height: 400px;
        margin: 30px 10px;
        padding: 20px 20px;
    }

    #competitionName {
        font-family: "幼圆" , serif;
    }

    #competitionDetail {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 20px 20px 0 20px;
        font-size: 16px;
    }

    /deep/.el-divider {
        background-color: #409EFF;
    }

    .subTitle {
        font-weight: 600;
        font-size: 16px;
    }

    .competitionDisc{
        font-size: 14px;
        text-align: left;
        text-indent: 2em;
        line-height: 2em;
        margin-bottom: 10px;
    }
</style>