<template>
    <div id="myProject">
        <div class="competitionSelect">
            <el-select v-model="selectValue" size="small" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="div-15"></div>
        <div class="competitionList">
            <competition-card v-for="item in competitionList"
                                   :key="item.id"
                                   :competition="item">
            </competition-card>
        </div>
    </div>
</template>

<script>
    // import competitionCardUser from "@/views/userConsole/components/competitionCardUser";
    import competitionCard from "@/views/login/components/competitionCard";
    import {competitionList} from "@/api/login";

    export default {
        name: "viewCompetition",
        data() {
            return{
                competitionList:[],//比赛列表
                selectValue:'全部比赛',//过滤器值
                //过滤器
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
        components:{ competitionCard },
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
    .message {
        width: 1200px;
        margin: 0 auto;
    }

    .competitionList {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: space-around;
    }

    .competitionSelect {
        width: 95%;
        margin-left: 15px;
    }

    /deep/.el-tabs__item {
        font-family: "幼圆" , serif;
        width: 180px;
        height: 50px;
        font-size: 16px;
    }

</style>

