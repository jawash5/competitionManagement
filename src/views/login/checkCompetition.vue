<template>
    <div id="checkCompetition">
        <head-login :state="state"></head-login>
        <div class="wrap">
            <div class="div-30"></div>
            <div class="competitionSelect">
                <el-select v-model="selectValue" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="competitionList">
                <competition-card v-for="item in competitionList"
                                  :key="item.id"
                                  :competition="item">
                </competition-card>
            </div>
        </div>
    </div>
</template>

<script>
    import {competitionList} from "@/api/login";
    import headLogin from "@/views/login/components/headLogin";
    import competitionCard from "@/views/login/components/competitionCard";
    import {getCode} from "@/utils/app";

    export default {
        name: "checkCompetition",
        components:{
            "headLogin": headLogin,
            "competitionCard":competitionCard
        },
        data(){
            return{
                competitionList:[],
                selectValue:'全部比赛',
                options:[
                    {value: '选项1', label: '全部比赛'}
                ]
            }
        },
        computed:{
            state() {
                return getCode() === '0';
            }
        },
        methods: {
            getCompetitionList:function () {
                competitionList().then(response => {
                    this.competitionList = response.data.data
                }).catch(error => {
                    this.$message.error('服务器开小差啦~');
                    console.log(error);
                });
            }
        },
        mounted() {
            this.getCompetitionList()
        }
    }
</script>

<style lang="scss" scoped>
    #checkCompetition {
        background-color: #f7f7f7;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 1200px;
        min-height: 800px;

        .wrap {
            height: 100vh;
            min-height: 680px;
        }

        .competitionSelect {
            margin-left: 50px;
        }

        .competitionList {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-content: flex-start;
            /*justify-content: space-around;*/
            justify-content: flex-start;
            margin-top: 30px;
            margin-left: 30px;
        }
    }

    /deep/.el-tabs__item {
        font-family: "幼圆" , serif;
        width: 200px;
        height: 60px;
        font-size: 18px;
    }

    /deep/.el-tabs__nav-next {
        display: block;
        text-align: left;
    }

    /deep/.el-tabs__nav-prev{
        display: block;
        text-align: left;
    }

</style>