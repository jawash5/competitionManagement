<template>
    <div id="checkCompetition">
        <head-login :state="true"></head-login>
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
        <my-footer></my-footer>
    </div>
</template>

<script>
    import {competitionList} from "@/api/login";
    import headLogin from "@/views/login/components/headLogin";
    import myFooter from "@/views/login/components/myFooter";
    // import competition from "@/components/competition";
    import competitionCard from "@/views/login/components/competitionCard";

    export default {
        name: "checkCompetition",
        components:{
            "headLogin": headLogin,
            "myFooter": myFooter,
            // "competition":competition
            "competitionCard":competitionCard
        },
        data(){
            return{
                competitionList:[],
                selectValue:'全部比赛',
                options:[
                    {
                        value: '选项1',
                        label: '全部比赛'
                    }, {
                        value: '选项2',
                        label: '标签2'
                    }, {
                        value: '选项3',
                        label: '标签3'
                    }
                ]
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
        background-color: #f2f2f2;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 1200px;
        min-height: 800px;
    }

    .competitionList {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;
    }

    .competitionSelect {
        width: 95%;
        margin-left: 15px;
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