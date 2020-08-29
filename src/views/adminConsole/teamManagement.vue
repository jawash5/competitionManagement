<template>
    <div id="teamManagement">
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
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                tooltip-effect="dark"
                border
                style="width: 100%">
            <el-table-column
                    type="selection"
                    width="50"
                    align="center">
            </el-table-column>
            <el-table-column
                    type="index"
                    width="50"
                    align="center"
                    label="序号">
            </el-table-column>
            <el-table-column v-for="item in titleData"
                             :key="item.id"
                             :prop="item.prop"
                             :label="item.label"
                             :width="item.width"
                             align="center"
                             show-overflow-tooltip>
                <template slot-scope="scope">
                    <span v-if="scope.row.isSet">
                        <el-input size="mini" v-model="tableData[scope.$index][item.prop]">
                        </el-input>
                    </span>
                    <span v-else>{{tableData[scope.$index][item.prop]}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="submit"
                    label="上交情况"
                    width="60px"
                    align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.isSet">
                        <el-checkbox v-model="tableData[scope.$index].submit"></el-checkbox>
                    </span>
                    <span v-else>{{tableData[scope.$index].submit === true? '是':'否' }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="promotion"
                    label="晋级情况"
                    width="60px"
                    align="center">
                <template slot-scope="scope">
                            <span v-if="scope.row.isSet">
                                <el-checkbox v-model="tableData[scope.$index].promotion"></el-checkbox>
                            </span>
                    <span v-else>{{tableData[scope.$index].promotion === true? '是':'否' }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="180">
                <template slot-scope="scope" >
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index)"
                            v-if="!scope.row.isSet">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index)"
                            v-if="!scope.row.isSet">删除</el-button>
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
            <el-col :span="12">
                <el-button size="medium">批量删除</el-button>
            </el-col>
            <el-col :span="12">
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
        name: "teamManagement",
        components: {
        },
        data() {
            return {
                statement:false,
                search:'',
                currentPage:1,
                total: 1,
                edit:false,
                competitionOptions: [{
                    value: '选项1',
                    label: '电子商务竞赛'
                }],
                searchOptions: [{
                    value: '选项1',
                    label: '电子商务竞赛'
                }],
                competitionValue: '',
                titleData:[
                    { prop:"no", label:"队伍序号", width:"60"},
                    { prop:"projectName", label:"项目名称", width:""},
                    { prop:"name", label:"队长姓名", width:"100"},
                    { prop:"teamName", label:"队伍名称", width:"120"},
                    { prop:"mail", label:"队伍邮箱", width:"200"},
                ],
                tableData: [
                    {
                        no: '1',
                        name: '小明',
                        projectName: '竞赛管理平台',
                        teamName:'12456',
                        mail:'857723555@qq.com',
                        submit:'是',
                        promotion:'是',
                        isSet:false,
                    },
                    {
                        no: '1',
                        name: '小明',
                        projectName: '竞赛管理平台',
                        teamName:'12456',
                        mail:'857723555@qq.com',
                        submit:'是',
                        promotion:'是',
                        isSet:false,
                    },
                    {
                        no: '1',
                        name: '小明',
                        projectName: '竞赛管理平台',
                        teamName:'12456',
                        mail:'857723555@qq.com',
                        submit:'是',
                        promotion:'是',
                        isSet:false,
                    },
                    {
                        no: '1',
                        name: '小明',
                        projectName: '竞赛管理平台',
                        teamName:'12456',
                        mail:'857723555@qq.com',
                        submit:'是',
                        promotion:'是',
                        isSet:false,
                    },
                    {
                        no: '1',
                        name: '小明',
                        projectName: '竞赛管理平台',
                        teamName:'12456',
                        mail:'857723555@qq.com',
                        submit:'是',
                        promotion:'是',
                        isSet:false,
                    },
                    {
                        no: '1',
                        name: '小明',
                        projectName: '竞赛管理平台',
                        teamName:'12456',
                        mail:'857723555@qq.com',
                        submit:'是',
                        promotion:'是',
                        isSet:false,
                    },
                    {
                        no: '1',
                        name: '小明',
                        projectName: '竞赛管理平台',
                        teamName:'12456',
                        mail:'857723555@qq.com',
                        submit:'是',
                        promotion:'是',
                        isSet:false,
                    },
                ],

            };
        },
        methods: {
            current_change:function (currentPage) {
                this.currentPage = currentPage;
            },
            handleEdit:function (index) {
                this.tableData[index].isSet = true;
            },
            handleDelete:function (index) {
                this.tableData.splice(index,1);
                this.$confirm('此操作将永久删除该队伍, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
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
    #teamManagement {
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