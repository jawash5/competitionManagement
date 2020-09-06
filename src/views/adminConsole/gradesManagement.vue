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
                        <el-select v-model="searchKeyValue" placeholder="搜索关键字" size="small" style="width: 120px">
                            <el-option
                                    v-for="item in searchOptions"
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
                    width="120"
                    align="center">
            </el-table-column>

            <el-table-column
                    prop="promotion"
                    label="晋级情况"
                    width="80"
                    align="center">
                <template slot-scope="scope">
<!--                    <span v-if="isSet">-->
<!--                        <el-checkbox v-model="tableData[scope.$index].promotion"></el-checkbox>-->
<!--                    </span>-->
                    <span v-for="item in tableData[scope.$index].isPromote"
                          :key="item.id">{{item.state === true? '〇':'✖' }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="grades"
                    label="得分"
                    width="80"
                    align="center">
                <template slot-scope="scope">
<!--                    <span v-if="isSet">-->
<!--                        <el-input size="mini" v-model="tableData[scope.$index].grades" maxlength="3">-->
<!--                        </el-input>-->
<!--                    </span>-->
                    <span>{{ tableData[scope.$index].grades }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="操作"
                    width="180"
                    align="center">
                <template>
                    <el-button
                            size="mini"
                            @click="handleEdit">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
                title="编辑信息"
                :visible.sync="dialogVisible"
                width="30%"
                center>
            <div style="margin: 0 50px">
                <el-form ref="editForm" :model="editForm" label-width="80px">
                    <el-row gutter="20">
                        <el-col span="12">
                            <el-form-item label="队伍得分">
                                <el-input v-model="editForm.grades" maxlength="3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="晋级情况">
                        <el-checkbox v-for="item in editForm.isPromote"
                                     :key="item.id"
                                     v-model="item.state">{{item.name}}</el-checkbox>
                    </el-form-item>

                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>

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
                currentPage:1,//当前页码
                total: 1,//总数据数量
                dialogVisible:false, //编辑对话框
                //比赛选项
                competitionOptions: [{
                    value: '选项1',
                    label: '电子商务竞赛'
                }],
                //比赛选择值
                competitionValue: '',
                //关键词选项
                searchOptions: [{
                    value: '选项1',
                    label: '电子商务竞赛'
                }],
                //关键词
                searchKeyValue: '',
                tableData: [
                    {
                        no: '1',
                        name: '小明',
                        projectName: '竞赛管理平台',
                        isPromote:{
                            first:{state:false, name:'初赛'},
                            second:{state:false, name:'复赛'},
                            third:{state:false, name:'决赛'}
                        },
                        grades:80,
                    }
                ],
                editForm:{
                    isPromote:{
                        first:{state:true, name:'初赛'},
                        second:{state:false, name:'复赛'},
                        third:{state:false, name:'决赛'}
                    },
                    grades:90,
                }

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
            handleEdit:function () {
                this.dialogVisible = true;
            },
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