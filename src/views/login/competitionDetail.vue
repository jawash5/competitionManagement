<template>
    <div id="competitionDetail">
        <head-login :state="state"></head-login>
        <el-page-header class="header" @back="goBack" content="比赛列表"></el-page-header>
        <el-image :src="competitionInfo.mainImage"
                  style="width: 100%; z-index: -1"
                  fit="cover"></el-image>
        <div class="wrap">
            <div class="competitionName">
                <span v-if="competitionInfo.hasOwnProperty('year')">{{competitionInfo.year}} 年 </span>
                <span v-if="competitionInfo.hasOwnProperty('session')">第 {{competitionInfo.session}} 届 </span>
                {{competitionInfo.name}}
            </div>

            <el-steps :space="250" :active="stepActive" align-center finish-status="success">
                        <el-step v-for="item in competitionInfo.stages"
                                 :key="item.id"
                                 :title="item.name"
                                 :description="item.startDate + ' 至 ' + item.endDate"></el-step>
            </el-steps>

            <el-button v-if="stepActive > 0" class="pull-right" type="success" round disabled>已过报名时间</el-button>
            <el-button v-else
                       class="pull-right"
                       type="success"
                       round
                       :disabled="haveSignedUp"
                       @click="signUpCompetition">{{haveSignedUp ? '已报名': '立即报名'}}</el-button>
            <el-button round class="infoButton" type="success" @click="dVisible = true">比赛介绍</el-button>
            <div class="div-60"></div>
            <el-row>
                <el-col :span="16" class="dif">
                    <el-card class="content">
                        <div v-if="this.mdContent === ''">管理员很懒，什么也没有留下...</div>
                        <div class="markdown-body" v-html="content"></div>
                    </el-card>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-card class="announcement pull-right">
                        <div class="title">公告栏</div>
                        <div class="div-30"></div>
                        <div v-if="announcement.length === 0">
                            <el-divider></el-divider>
                            <div class="noAnnouncement">暂无公告信息</div>
                        </div>
                        <el-collapse v-if="announcement.length !== 0" class="collapse" v-model="activeName">
                            <el-collapse-item v-for="item in announcement"
                                              :key="item.id"
                                              :title="item.title"
                                              :name="item.id">
                                {{item.content}}
                            </el-collapse-item>
                        </el-collapse>
                    </el-card>
                </el-col>
            </el-row>
            <el-dialog :visible.sync="dVisible" width="90vw">
                    <div v-if="mdContent === ''">管理员很懒，什么也没有留下...</div>
                    <div class="markdown-body" v-html="content"></div>
            </el-dialog>
            <new-team :visible="newTeamVisible"
                      :dialogClose.sync="newTeamVisible"
                      @success="inviteMembers"
                      :competition-name="competitionInfo.name"
                      :id="competitionInfo.id"></new-team>

            <invite :visible="inviteVisible"
                    :dialogClose.sync="inviteVisible"
                    :group-id="groupId"></invite>
        </div>
    </div>
</template>

<script>
    import {getCode, getRole} from "@/utils/app";
    import newTeam from "@/views/userConsole/components/newTeam";
    import {competitionDetail} from "@/api/login";
    import {mavonEditor} from 'mavon-editor';
    import 'mavon-editor/dist/css/index.css';
    import {checkGroup, getBoard} from "@/api/userConsole";
    import invite from "@/views/userConsole/components/invite";
    import format from "@/utils/timeFormat";
    import headLogin from "@/views/login/components/headLogin";

    export default {
        name: "competitionDetail",
        components: {newTeam,invite,headLogin},
        data() {
            return{
                competitionInfo: {
                    mainImage: ''
                },
                dVisible:false,
                newTeamVisible:false,
                inviteVisible:false,
                activeName: '',//默认公告
                announcement:[],//公告
                mdContent:'',
                groupId: 0,
                haveSignedUp:false,
                stepActive: 100//默认步骤条高亮值
            }
        },
        computed:{
            content() {
                let markdownIt = mavonEditor.getMarkdownIt()
                return markdownIt.render(this.mdContent)
            },
            state() {
                return getCode() === '0';
            }

        },
        methods: {
            //获取比赛信息
            getCompetitionInfo() {
                const id = this.$route.query.id
                //检验是否已经报名
                this.checkSignUp(id);

                competitionDetail(id).then(response => {
                    let competitionInfo = response.data.data;
                    if(Object.prototype.hasOwnProperty.call(competitionInfo, 'mainImage')) {
                        competitionInfo.mainImage = competitionInfo.mainImage.replace('-internal', '');
                    }
                    this.mdContent = competitionInfo.information;
                    this.competitionInfo = competitionInfo;
                    this.sortStages('startDate')//按开始时间排序
                    this.getNowStage();
                    this.getBoard()//获取公告
                })
            },
            //阶段排序
            sortStages(key) {
                this.competitionInfo.stages.sort((a, b) => {
                  const data1 = Date.parse(a[key].replace(/-/g, '/'));
                  const data2 = Date.parse(b[key].replace(/-/g, '/'));
                  return data1 - data2;
              })
            },
            //检验是否报名
            checkSignUp(id) {
                if(getCode() === '0' && getRole() === '参赛者') {
                    checkGroup().then( response => {
                        const groups = response.data.data;
                        for (const group of groups) {
                            if(group.competitionInfo.id === id || group.competitionInfo.id + '' === id ) {
                                this.haveSignedUp = true;
                                break;
                            }
                        }
                    })
                }
            },

            //获取所处当前阶段
            getNowStage() {
                const time = Date.parse(format('YYYY-MM-DD HH:mm:ss').replace(/-/g, '/'));
                for(let i=0, stages = this.competitionInfo.stages ; i<stages.length; i++) {
                    const startDate = Date.parse(stages[i].startDate.replace(/-/g, '/'));
                    const endDate = Date.parse(stages[i].endDate.replace(/-/g, '/'));
                    if (i < stages.length-1) {
                        const startDateNext = Date.parse(stages[i+1].startDate.replace(/-/g, '/'));
                        if (time > startDate && time < endDate) {
                            this.stepActive = i
                        } else if ( time > endDate && time < startDateNext) {
                            this.stepActive = i + 0.5
                        }
                    } else if (i === stages.length-1) {
                        if (time > startDate && time < endDate) {
                            this.stepActive = i
                        } else if(time > endDate) {
                            this.stepActive = 100;
                        }
                    }
                }
            },
            //比赛报名
            signUpCompetition() {
                if(getCode() !== '0') {
                    this.$message('未登录请先登录!')
                    this.$router.push({
                        path:'/login',
                        query:{
                            redirect:'/competitionDetail?id=' + this.$route.query.id,
                        }
                    })
                } else {
                    if(getRole() === '管理员') {
                        this.$message('管理员大大不能报名哦!')
                    } else {
                        this.newTeamVisible = true;
                    }
                }
            },
            //返回
            goBack() {
                this.$router.push({
                    path:'/checkCompetition',
                })
            },
            //获取公告栏
            getBoard() {
                const data = {
                    competitionName: this.competitionInfo.name,
                    year: this.competitionInfo.year
                }
                getBoard(data).then( response => {
                    let announcement = response.data.data;
                    for(let i=0; i<announcement.length; i++) {
                        if(announcement[i].title.length > 16) {
                            announcement[i].title = announcement[i].title.slice(0,14) + '...'
                        }
                    }
                    this.announcement = announcement;
                })
            },
            inviteMembers(id) {
                this.getCompetitionInfo(this.$route.query.id);
                this.groupId = id;
                this.inviteVisible = true;
            }
        },
        mounted() {
            this.getCompetitionInfo();
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/config';

    #competitionDetail {
        min-width: 1200px;

        .header {
            position: absolute;
            left: 30px;
            top: 90px;
            padding: 5px 10px;
            border-radius: 15px;
            background-color: rgba(127, 127, 127, 0.3);
        }

        .wrap {
            padding: 30px 100px;

            .competitionName {
                margin: 30px 0 50px 0;
                font-size: 26px;
                text-align: center;
            }
        }

        .noAnnouncement {
            color: $noInfo;
            text-align: center;
            font-size: 16px;
            margin-top: 30px;
        }

        .announcement {
            width: 350px;
            min-height: 400px;
        }

        .title {
            text-align: center;
            font-size: 24px;
            margin-bottom: 10px;
        }

        /deep/.markdown-body img {
            width: 300px;
        }

        .content {
            padding: 50px;
        }

        /deep/.el-collapse-item__header {
           font-size: 14px;
           text-indent: 2em;
        }

        /deep/.el-collapse-item__content {
            padding-top:10px;
            padding-left: 20px;
            padding-right: 20px;
            background-color: #f7f7f7;
            white-space: pre-wrap;
        }

        /deep/.el-page-header__left .el-icon-back {
            color: #fff;
        }

        /deep/.el-page-header__content {
            font-size: 20px;
            color: #fff;
        }

        /deep/.el-page-header__title {
            font-size: 18px;
            color: #fff;
        }
    }

    @media screen and (max-width: 420px){

        .pull-right{
            position: absolute;
            right: 10vw;
        }

        .infoButton{
            position: absolute;
            left: 10vw;
        }

        .infoButton{

        }

        #competitionDetail {
            min-width: 0;
        }

        /deep/ .el-card.announcement.pull-right.is-always-shadow{
            position: absolute;
            right: -23vw;
        }

        .dif{
            display: none;
        }

    }

    @media screen and (max-width: 330px){
        /deep/ .el-card.announcement.pull-right.is-always-shadow{
            position: absolute;
            right: -31.5vw;
        }
    }

    @media screen and (min-width: 421px){
        .infoButton{
            display: none;
        }
    }

</style>
