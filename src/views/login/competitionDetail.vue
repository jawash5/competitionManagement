<template>
    <div id="competitionDetail">
        <el-page-header class="header" @back="goBack" content="比赛列表"></el-page-header>
        <div style="background-color: lightgreen; height: 300px"></div>
        <div class="wrap">
            <el-steps :space="250" :active="1" finish-status="success">
                <el-step v-for="item in competitionInfo.stages"
                         :key="item.id"
                         :title="item.name"></el-step>
            </el-steps>
            <el-button class="pull-right" type="success" round @click="signUpCompetition">立即报名</el-button>
            <div class="div-60"></div>
            <div class="markdown-body">
                <vue-markdown :source="context"></vue-markdown>
            </div>
            <new-team :visible="visible" @dialogClose="visible = false" :competition-name="competitionInfo.name"></new-team>
        </div>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown'
    import {getCode, getRole} from "@/utils/app";
    import newTeam from "@/views/userConsole/components/newTeam";
    import {competitionDetail} from "@/api/login";

    export default {
        name: "competitionDetail",
        data() {
            return{
                competitionInfo: '',
                visible:false
            }
        },
        computed:{
            context() {
                return this.competitionInfo.information
            }
        },
        components: {
            VueMarkdown,
            newTeam
        },
        methods: {
            getCompetitionInfo() {
                const id = this.$route.query.id
                competitionDetail(id).then(response => {
                    this.competitionInfo = response.data.data
                })


            },
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
                        this.visible = true;
                    }
                }
            },
            goBack() {
                this.$router.push({
                    path:'/checkCompetition',
                })
            }
        },
        mounted() {
            this.getCompetitionInfo();
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

        /deep/.el-page-header__content {
            font-size: 20px;
        }

        /deep/.el-page-header__title {
            font-size: 18px;
        }
    }
</style>