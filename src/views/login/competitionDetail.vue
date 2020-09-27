<template>
    <div id="competitionDetail">
        <el-page-header class="header" @back="goBack" content="比赛列表"></el-page-header>
        <div style="background-color: lightgreen; height: 300px"></div>
        <div class="wrap">
            <el-steps :space="200" :active="1" finish-status="success">
                <el-step v-for="item in competitionInfo.stages"
                         :key="item.id"
                         :title="item.name"></el-step>
            </el-steps>
            <el-button class="pull-right" type="success" round @click="signUpCompetition">立即报名</el-button>
            <div class="div-60"></div>
            <el-row>
                <el-col :span="18">
                    <div class="markdown-body" v-html="content"></div>
                </el-col>
                <el-col :span="6">
                    <el-card>
                        <div class="title">公告栏</div>
                        <el-collapse class="collapse" v-model="activeName" accordion>
                            <el-collapse-item title="一致性 Consistency" name="1">
                            </el-collapse-item>
                        </el-collapse>
                    </el-card>
                </el-col>
            </el-row>
            <new-team :visible="newTeamVisible"
                      @dialogClose="newTeamVisible = false"
                      :competition-name="competitionInfo.name"
                      :id="competitionInfo.id"></new-team>
        </div>
    </div>
</template>

<script>
    import {getCode, getRole} from "@/utils/app";
    import newTeam from "@/views/userConsole/components/newTeam";
    import {competitionDetail} from "@/api/login";
    import { mavonEditor } from 'mavon-editor';
    import 'mavon-editor/dist/css/index.css';
    import {getBoard} from "@/api/userConsole";

    export default {
        name: "competitionDetail",
        components: {newTeam},
        data() {
            return{
                competitionInfo: '',
                newTeamVisible:false,
                activeName: '',//默认公告
                announcement:''//公告
            }
        },
        computed:{
            content() {
                let markdownIt = mavonEditor.getMarkdownIt()
                return markdownIt.render(this.competitionInfo.information)
            }
        },
        methods: {
            //获取比赛信息
            getCompetitionInfo() {
                const id = this.$route.query.id
                competitionDetail(id).then(response => {
                    this.competitionInfo = response.data.data
                    this.sortStages('id')
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
            goBack() {
                this.$router.push({
                    path:'/checkCompetition',
                })
            },
            //获取公告栏
            getBoard() {
                getBoard().then( response => {
                    this.announcement = response.data.data;
                })
            }
        },
        mounted() {
            this.getCompetitionInfo();
            this.getBoard();
        },
    }
</script>

<style lang="scss" scoped>
    #competitionDetail {
        .header {
            position: absolute;
            left: 30px;
            top: 30px
        }

        .wrap {
            padding: 30px 100px;
        }

        .announcement {
            background-color: #fff;
        }

        .title {
            text-align: center;
            font-size: 24px;
            margin-bottom: 10px;
        }
        .collapse {
            padding: 20px;
        }

        /*/deep/.el-collapse-item__header {*/
        /*    background-color:#f7f7f7;*/
        /*}*/

        /deep/.el-page-header__content {
            font-size: 20px;
        }

        /deep/.el-page-header__title {
            font-size: 18px;
        }
    }
</style>