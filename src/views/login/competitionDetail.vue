<template>
    <div class="competitionDetail">
        <div class="head">
            <div class="competitionName">
                <span v-if="competitionInfo.hasOwnProperty('year')">{{competitionInfo.year}}年</span>
                <span v-if="competitionInfo.hasOwnProperty('session')">第 {{competitionInfo.session}} 届 </span>
                {{competitionInfo.name}}
            </div>
        </div>

        <div class="wrap">
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
            <el-button round class="infoButton" type="success" @click="visible.dVisible = true">查看公告</el-button>

            <div style="height: 60px; clear: both"></div>
            <el-row>
                <el-col :span="16">
                    <div class="describeContent">
                        <div v-if="competitionInfo.information === ''">管理员很懒，什么也没有留下...</div>
                        <div class="markdown-body" v-html="content"></div>
                    </div>
                </el-col>
                <el-col :span="6" :offset="2" class="dif">
                    <div class="announcements">
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
                    </div>
                </el-col>
            </el-row>

            <el-dialog title="公告栏" center :visible.sync="visible.dVisible" width="90vw">
                <div v-if="announcement.length === 0">
                    <el-divider></el-divider>
                    <div class="noAnnouncement">暂无公告信息</div>
                </div>
                <el-collapse v-else class="collapse" v-model="activeName">
                    <el-collapse-item v-for="item in announcement"
                                      :key="item.id"
                                      :title="item.title"
                                      :name="item.id">
                        {{item.content}}
                    </el-collapse-item>
                </el-collapse>
            </el-dialog>

            <new-team :visible.sync="visible.newTeamVisible"
                      @success="inviteMembers"
                      :competition-name="competitionInfo.name"
                      :id="parseInt(competitionInfo.id)"></new-team>

            <invite :visible.sync="visible.inviteVisible"
                    :group-id="groupId"></invite>
        </div>
        <my-footer></my-footer>
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
    import MyFooter from "@/views/login/components/myFooter";

    export default {
        name: "competitionDetail",
        components: {MyFooter, newTeam,invite},
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
            //邀请队友
            inviteMembers(id) {
                this.haveSignedUp = true; //状态改为已报名
                this.groupId = id;
                if (this.competitionInfo.signForm.maxPeople !== 1) {
                    this.visible.inviteVisible = true;
                }
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

        .head {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
            height: 600px;
            background-image: url("https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg");
            background-repeat: no-repeat;
            background-size: cover;
            background-position: 0 40%;

            .competitionName {
                margin: 0 100px;
                text-align: center;
                font-size: 60px;
                font-weight: bold;
                letter-spacing: .5em;
                color: #ffffff;
                z-index: 1;
            }
        }

        .wrap {
            position: relative;
            top: -100px;
            margin: 0 100px;
            padding: 100px 100px 30px 100px;
            background-color: #fff;
            border-radius: 15px;
            background-image: linear-gradient(#ffffff 40%, #f7f7f7 80%);

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
                    letter-spacing: .5em;
                }

                .noAnnouncement {
                    color: $noInfo;
                    text-align: center;
                    font-size: 14px;
                    margin-top: 30px;
                }
            }
        }
    }

    /deep/.el-collapse-item__header {
        padding: 0 0 0 1em;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: transparent;
    }

    /deep/.el-collapse-item__content {
        padding-top:.5em;
        padding-left: 1em;
        padding-right: 1em;
        background-color: #f7f7f7;
        white-space: pre-wrap;
    }

    @media screen and (max-width: 800px) {
        .competitionDetail {
            .head {
                height: 50vh;

                .competitionName {
                    margin: 10px;
                    font-size: 30px;
                }
            }

            .wrap {
                padding: 30px 20px;
                margin: 0 5vw;

                .infoButton {
                    float: left;
                }

                .dif{
                    display: none;
                }
            }

            .el-col-16 {
                width: 100%;
            }
        }
    }

    @media screen and (min-width: 801px){

        .infoButton{
            display: none;
        }
    }

</style>
