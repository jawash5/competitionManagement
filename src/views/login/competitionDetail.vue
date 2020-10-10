<template>
    <div id="competitionDetail">
        <el-page-header class="header" @back="goBack" content="比赛列表"></el-page-header>
        <el-image :src="competitionInfo.mainImage"
                  style="width: 100%; height: 400px;
                  z-index: -1"
                  fit="cover"></el-image>
        <div class="wrap">
            <el-steps :space="200" :active="1" finish-status="success">
                <el-step v-for="item in competitionInfo.stages"
                         :key="item.id"
                         :title="item.name"></el-step>
            </el-steps>
            <el-button class="pull-right"
                       type="success"
                       round
                       :disabled="haveSignedUp"
                       @click="signUpCompetition">{{haveSignedUp ? '已报名': '立即报名'}}</el-button>
            <div class="div-60"></div>
            <el-row>
                <el-col :span="16">
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
    import { mavonEditor } from 'mavon-editor';
    import 'mavon-editor/dist/css/index.css';
    import {getBoard,checkGroup} from "@/api/userConsole";
    import invite from "@/views/userConsole/components/invite";

    export default {
        name: "competitionDetail",
        components: {newTeam,invite},
        data() {
            return{
                competitionInfo: {},
                newTeamVisible:false,
                inviteVisible:false,
                activeName: '',//默认公告
                announcement:[],//公告
                mdContent:'',
                groupId:'',
                haveSignedUp:false
            }
        },
        computed:{
            content() {
                let markdownIt = mavonEditor.getMarkdownIt()
                return markdownIt.render(this.mdContent)
            }
        },
        methods: {
            //获取比赛信息
            getCompetitionInfo() {
                const id = this.$route.query.id
                //检验是否已经报名
                if(getCode() === '0') {
                    checkGroup().then( response => {
                        const groups = response.data.data;
                        for (const group of groups) {
                            if(group.competitionInfo.id === id) {
                                this.haveSignedUp = true;
                                break;
                            }
                        }
                    })
                }

                competitionDetail(id).then(response => {
                    this.competitionInfo = response.data.data;
                    this.mdContent = this.competitionInfo.information;
                    this.sortStages('id')//按id排序
                    this.getBoard()//获取公告
                })
            },
            //阶段排序
            sortStages(key) {
              const stages = this.competitionInfo.stages;
              stages.sort((a, b) => {
                  const data1 = a[key];
                  const data2 = b[key];
                  return data1 - data2;
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
        min-width: 1400px;

        .header {
            position: absolute;
            left: 30px;
            top: 30px
        }

        .wrap {
            padding: 30px 100px;
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
</style>