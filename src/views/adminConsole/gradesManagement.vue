<template>
    <div id="gradesManagement">
        <el-form>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="比赛类型">
                        <el-select v-model="competitionValue" placeholder="请选择比赛" size="small">
                            <el-option
                                    v-for="item in competitionOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="关键字">
                        <el-select v-model="competitionValue" placeholder="搜索关键字" size="small" style="width: 120px">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        <el-input placeholder="请输入搜索内容" size="small"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="4">
                    <el-button type="danger" size="small" class="classButton">搜索</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="danger" size="small" class="pull-right classButton">新增</el-button>
                </el-col>
            </el-row>
        </el-form>

        <el-table
                ref="multipleTable"
                :data="tableData"
                border
                tooltip-effect="dark"
                style="width: 100%">
            <el-table-column
                    type="selection"
                    width="50"
                    align="center">
            </el-table-column>

            <el-table-column
                    prop="no"
                    label="序号"
                    width="50"
                    align="center">
            </el-table-column>

            <el-table-column
                    prop="projectName"
                    label="项目名称"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>

            <el-table-column
                    prop="name"
                    label="队长姓名"
                    width="100"
                    align="center">
            </el-table-column>

            <el-table-column
                    prop="mail"
                    label="队伍邮箱"
                    width="180"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>

            <el-table-column
                    prop="submit"
                    label="上交情况"
                    width="80"
                    align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.isSet">
                        <el-checkbox v-model="tableData[scope.$index].submit"></el-checkbox>
                    </span>
                    <span v-else>{{ tableData[scope.$index].submit===true? '是':'否' }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="promotion"
                    label="晋级情况"
                    width="80"
                    align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.isSet">
                        <el-checkbox v-model="tableData[scope.$index].promotion"></el-checkbox>
                    </span>
                    <span v-else>{{tableData[scope.$index].submit===true? '是':'否' }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="grades"
                    label="得分"
                    width="80"
                    align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.isSet">
                        <el-input size="mini" v-model="tableData[scope.$index].grades" maxlength="3">
                        </el-input>
                    </span>
                    <span v-else>{{ tableData[scope.$index].grades }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="操作"
                    width="180"
                    align="center">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index)"
                            v-if="!scope.row.isSet">编辑状态</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleConform(scope.$index)"
                            v-if="scope.row.isSet">确定</el-button>
                    <el-button
                            size="mini"
                            @click="handleCancel(scope.$index)"
                            v-if="scope.row.isSet">取消</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="div-30"></div>
        <el-row>
            <el-col :span="12" :offset="12">
                <el-pagination
                        class="pull-right"
                        background
                        layout="total, prev, pager, next"
                        :total="total"
                        @current-change="current_change">
                </el-pagination>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "gradesManagement",

        data() {
            return {
                search:'',
                currentPage:1,
                total: 1,
                edit:false,
                competitionValue: '',
                options: [{
                    value: '选项1',
                    label: '电子商务竞赛'
                }],
                tableData: [
                    {
                        no: '1',
                        name: '小明',
                        projectName: '竞赛管理平台',
                        mail:'857723555@qq.com',
                        submit:true,
                        promotion:true,
                        grades:80,
                        isSet:false,
                    }
                ],

            };
        },
        methods: {
            releaseResults:function(){
                this.$confirm('此操作不可撤回, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '成绩发布成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            current_change:function (currentPage) {
                this.currentPage = currentPage;
            },
            handleEdit:function (index) {
                this.tableData[index].isSet = true;
            },
            handleConform:function (index) {
                this.tableData[index].isSet = false;
            },
            handleCancel:function (index) {
                this.tableData[index].isSet = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    #gradesManagement {
        background-color: #FFFFFF;
        margin: 0 auto;
        padding: 20px;

        /deep/.el-table thead {
            font-weight: bold;
            color: #344a5f;
        }

        .classButton {
            margin-top: 5px;
            margin-left: 10px;
        }
    }
</style>