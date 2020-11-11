<template>
    <div class="competitionDetail">
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
                                 :description="item.startDate.slice(0, -3) + ' 至 ' + item.endDate.slice(0, -3)"></el-step>
            </el-steps>
            <div class="div-15"></div>

            <el-button v-if="stepActive > 0" class="pull-right" type="success" round disabled>已过报名时间</el-button>
            <el-button v-else
                       class="pull-right"
                       type="success"
                       round
                       :disabled="haveSignedUp"
                       @click="signUpCompetition">{{haveSignedUp ? '已报名': '立即报名'}}</el-button>
            <el-button round class="infoButton" type="success" @click="visible.dVisible = true">比赛介绍</el-button>
            <div class="div-60"></div>

            <el-row>
                <el-col :span="16" class="dif">
                    <el-card class="describeContent">
                        <div v-if="competitionInfo.information === ''">管理员很懒，什么也没有留下...</div>
                        <div class="markdown-body" v-html="content"></div>
                    </el-card>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-card class="announcements">
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
            <el-dialog :visible.sync="visible.dVisible" width="90vw">
                    <div v-if="competitionInfo.information === ''">管理员很懒，什么也没有留下...</div>
                    <div class="markdown-body" v-html="content"></div>
            </el-dialog>

            <new-team :visible.sync="visible.newTeamVisible"
                      @success="inviteMembers"
                      :competition-name="competitionInfo.name"
                      :id="parseInt(competitionInfo.id)"></new-team>

            <invite :visible.sync="visible.inviteVisible"
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
                    mainImage: '', //背景图片
                    information: '', //比赛介绍信息'
                    year: '', //比赛年份
                    name: '', //比赛名称
                    id: '', //比赛id
                    session: '' // 比赛届数
                },
                visible:{
                    dVisible:false,
                    newTeamVisible:false,
                    inviteVisible:false,
                },
                activeName: '',//默认公告
                announcement:[],//公告
                groupId: 0,
                haveSignedUp:false,
                stepActive: -1//默认步骤条高亮值
            }
        },
        computed:{
            content() {
                let markdownIt = mavonEditor.getMarkdownIt()
                return markdownIt.render(this.competitionInfo.information)
            },
            state() {
                return getCode() === '0';
            }

        },
        methods: {
            //获取初始化信息
            getInitInfo() {
                //获取比赛id值
                const id = this.$route.query.id
                //检验是否已经报名
                this.checkSignUp(id);
                //获取比赛信息
                competitionDetail(id).then(response => {
                    let competitionInfo = response.data.data;
                    //检验是否有背景图片属性
                    if(Object.prototype.hasOwnProperty.call(competitionInfo, 'mainImage')) {
                        competitionInfo.mainImage = competitionInfo.mainImage.replace('-internal', '');
                    } else {
                        competitionInfo.mainImage = 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
                    }
                    //按照开始时间排序
                    competitionInfo.stages.sort((a, b) => {
                        const data1 = Date.parse(a['startDate'].replace(/-/g, '/'));
                        const data2 = Date.parse(b['startDate'].replace(/-/g, '/'));
                        return data1 - data2;
                    })
                    //获取当前阶段
                    this.competitionInfo = competitionInfo;
                    this.getNowStage();
                    //获取公告
                    this.getBoard()
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

            //获取公告
            getBoard() {
                const data = {
                    competitionName: this.competitionInfo.name,
                    year: this.competitionInfo.year
                }
                getBoard(data).then( response => {
                    let announcement = response.data.data;
                    if (announcement.length !== 0) {
                        this.announcement = announcement;
                        this.activeName = announcement[0].id;
                    }
                })
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
                        this.visible.newTeamVisible = true;
                    }
                }
            },
            //返回
            goBack() {
                this.$router.push({
                    path:'/checkCompetition',
                })
            },

            //邀请队友
            inviteMembers(id) {
                //重新检验检验是否已经报名
                this.haveSignedUp = true;
                this.groupId = id;
                this.visible.inviteVisible = true;
            }
        },
        mounted() {
            this.getInitInfo();
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/config';

    .competitionDetail {
        min-width: 1200px;

        .header {
            position: absolute;
            left: 30px;
            top: 90px;
            padding: 5px 10px;
            border-radius: 15px;
            background-color: rgba(127, 127, 127, 0.3);

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

        .wrap {
            padding: 30px 100px;
            background-image: url("../../assets/main/backgroud.png");
            background-repeat: repeat;
            background-clip: padding-box;

            .competitionName {
                margin: 30px 0 100px 0;
                font-size: 38px;
                font-weight: bold;
                color: #303133;
                text-align: center;
            }

            /*比赛介绍内容*/
            .describeContent {
                border-radius: 15px;
                margin: 20px 0;
                padding: 30px;

                /deep/.markdown-body img {
                    width: 300px;
                }
            }

            .announcements {
                min-height: 500px;
                margin: 20px 0;
                border-radius: 15px;

                .title {
                    margin-bottom: 10px;
                    color: #303133;
                    text-align: center;
                    font-size: 24px;
                }

                .noAnnouncement {
                    color: $noInfo;
                    text-align: center;
                    font-size: 14px;
                    margin-top: 30px;
                }

                /deep/.el-collapse-item__header {
                    padding: 0 0 0 1em;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                /deep/.el-collapse-item__content {
                    padding-top:.5em;
                    padding-left: 1em;
                    padding-right: 1em;
                    background-color: #f7f7f7;
                    white-space: pre-wrap;
                }
            }
        }
    }

    @media screen and (max-width: 426px){
        .competitionDetail {
            min-width: 0;

            .wrap {
                padding: 30px 20px;

                .infoButton{
                    float: left;
                }

                .dif{
                    display: none;
                }
            }

            .el-col-6 {
                width: 100%;
            }

            .el-col-offset-2 {
                margin-left: 0;
            }
        }
    }

    @media screen and (min-width: 427px){

        .infoButton{
            display: none;
        }
    }

</style>
