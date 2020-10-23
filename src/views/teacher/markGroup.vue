<template>
    <div>
        <el-page-header @back="goBack"></el-page-header>
        <div class="div-30"></div>
        <el-select v-model="stage" placeholder="请选择" size="small" style="margin-left: 30px" @change="getGroups">
            <el-option
                    v-for="item in stageOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>

        <el-table
                :data="tableData"
                stripe
                highlight-current-row
                style="width: 100%; margin: 30px auto">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>

            <el-table-column
                    prop="groupInfo.name"
                    label="队伍名称">
            </el-table-column>

            <el-table-column
                    prop="groupInfo.captainId"
                    label="队长姓名"
                    width="250">
            </el-table-column>

            <el-table-column
                    prop="groupInfo.expireAt"
                    label="expireAt"
                    width="150">
            </el-table-column>

            <el-table-column
                    prop="score"
                    label="得分"
                    width="150">
            </el-table-column>

            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-input v-model.number="score[scope.$index]"
                              size="mini"
                              placeholder="分数"
                              maxlength="3"
                              style="display: inline-block; width: 6em; margin-right: 1em"></el-input>

                    <el-button
                            size="mini"
                            @click="mark(scope.$index, scope.row)">打分</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import {competitionDetail} from "@/api/login";
    import sortValue from "@/utils/sort";
    import {teacherMarkGroup, teacherMark} from "@/api/teacher";

    export default {
        name: "markGroup",
        data () {
            return {
                stageOptions:[],//阶段列表
                stage:'',//当前阶段
                tableData:[],//表格数据
                score:[],//得分
            }
        },
        methods:{
            goBack() {
                this.$router.push('/teacherConsole/scoringWork')
            },
            //获取阶段
            getStages() {
                const competitionId = this.$route.query.id;
                competitionDetail(competitionId).then( response => {
                    let stages = response.data.data.stages;
                    sortValue(stages, 'id');
                    let optionsValue = []
                    for (const stage of stages) {
                        optionsValue.push({label:stage.name, value:stage.id})
                    }
                    this.stageOptions = optionsValue;
                    this.stage = optionsValue[0].value;
                    this.getGroups();//获取小组信息
                })
            },
            //获取小组信息
            getGroups() {
                teacherMarkGroup(this.stage).then( response => {
                    this.tableData = response.data.data;
                })
            },
            //打分
            mark(index, row) {
                const data = {
                    markId: row['markId'],
                    score: this.score[index]
                }

                teacherMark(data).then( response => {
                    this.$message.success(response.data.data);
                    this.score[index] = '';
                    this.getGroups();
                }).catch( error => {
                    this.$message.error( error.response.data)
                })
            }
        },
        mounted() {
            this.getStages();
        }
    }
</script>

<style lang="scss" scoped>
    /deep/.el-table thead {
        font-weight: bold;
        color: #344a5f;
    }
</style>