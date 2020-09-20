<template>
    <div id="competitionDetail">
<!--        <img alt="讨论" src="../../assets/main/discuss.jpg" style="width: 100%">-->
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
        </div>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown'
    import {getCode} from "@/utils/app";

    export default {
        name: "competitionDetail",
        data() {
            return{
                competitionInfo: '',
            }
        },
        computed:{
            context() {
                return this.competitionInfo.information
            }
        },
        components: {
            VueMarkdown // 注入组件
        },
        methods: {
            getCompetitionInfo() {
                const competitionInfo = this.$store.getters['competition/competitionInfo'];
                this.competitionInfo = JSON.parse(competitionInfo);

            },
            signUpCompetition() {
                if(getCode() !== '0') {
                    this.$message('未登录请先登录!')
                    this.$router.push({
                        path:'/login',
                        query:{
                            redirect:'/projectDetail'
                        }
                    })
                } else {
                    this.$router.push({
                        path:'/projectDetail',
                    })
                }

            },
            goBack() {
                if(getCode() === '0') {
                    this.$router.push({
                        path:'/viewCompetition',
                    })
                } else {
                    this.$router.push({
                        path:'/checkCompetition',
                    })
                }
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