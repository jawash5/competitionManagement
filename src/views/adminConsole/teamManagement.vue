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
                        <el-select v-model="searchKeyValue" placeholder="搜索关键字" size="small" style="width: 120px">
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
                    <span>{{ tableData[scope.$index][item.prop] }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="submit"
                    label="上交情况"
                    width="60"
                    align="center">
                <template slot-scope="scope">
                    <span v-for="item in tableData[scope.$index].isSubmit"
                          :key="item.id">{{item.state === true? '〇':'✖' }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="promotion"
                    label="晋级情况"
                    width="60"
                    align="center">
                <template slot-scope="scope">
                    <span v-for="item in tableData[scope.$index].isPromote"
                          :key="item.id">{{item.state === true? '〇':'✖' }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    width="80"
                    align="center"
                    label="作品审核">
                <template slot-scope="scope">
                    <span>{{tableData[scope.$index].isCheck === true? '已审核':'未审核' }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作" width="160">
                <template slot-scope="scope" >
                    <el-button
                            size="mini"
                            @click="handleEdit()"
                            >编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index)"
                            >删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
                title="修改资料"
                :visible.sync="dialogVisible"
                center
                width="50%">
            <div style="margin: 0 50px">
                <el-form ref="editForm" :model="editForm" label-width="80px">
                    <el-row gutter="20">
                        <el-col span="12">
                            <el-form-item label="队伍序号">
                                <el-input v-model="editForm.teamID"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col span="12">
                            <el-form-item label="队长姓名">
                                <el-input v-model="editForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="项目名称">
                        <el-input v-model="editForm.projectName"></el-input>
                    </el-form-item>

                    <el-row gutter="20">
                        <el-col span="12">
                            <el-form-item label="队伍名称">
                                <el-input v-model="editForm.teamName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col span="12">
                            <el-form-item label="队伍邮箱">
                                <el-input v-model="editForm.mail"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="上交情况">
                        <el-checkbox v-for="item in editForm.isSubmit"
                                     :key="item.id"
                                     v-model="item.state">{{item.name}}</el-checkbox>
                    </el-form-item>

                    <el-form-item label="晋级情况">
                        <el-checkbox v-for="item in editForm.isPromote"
                                     :key="item.id"
                                     v-model="item.state">{{item.name}}</el-checkbox>
                    </el-form-item>

                    <el-form-item label="权限管理">
                        <el-checkbox v-for="item in editForm.authority"
                                     :key="item.id"
                                     v-model="item.state">{{item.name}}</el-checkbox>
                    </el-form-item>

                    <el-form-item label="作品审核">
                        <el-switch v-model="editForm.projectCheck"></el-switch>
                    </el-form-item>

                </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEditForm">确 定</el-button>
            </span>
        </el-dialog>


        <div class="div-30"></div>
        <el-row>
            <el-col :span="12">
                <el-button size="medium">批量删除</el-button>
                <el-button size="medium">修改权限</el-button>
                <el-button size="medium">下载信息</el-button>
                <el-button size="medium">发送通知</el-button>
                <el-button size="medium">文件下载</el-button>
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
                        isSubmit:{
                            first: {state:false, name:'初赛'},
                            second:{state:false, name:'复赛'},
                            third:{state:false, name:'决赛'}
                        },
                        isPromote:{
                            first: {state:false, name:'初赛'},
                            second:{state:false, name:'复赛'},
                            third:{state:false, name:'决赛'}
                        },
                        isCheck:true,
                    },
                    {
                        no: '1',
                        name: '小明',
                        projectName: '竞赛管理平台',
                        teamName:'12456',
                        mail:'857723555@qq.com',
                        isSubmit:{
                            first: {state:false, name:'初赛'},
                            second:{state:false, name:'复赛'},
                            third:{state:false, name:'决赛'}
                        },
                        isPromote:{
                            first: {state:false, name:'初赛'},
                            second:{state:false, name:'复赛'},
                            third:{state:false, name:'决赛'}
                        },
                        isCheck:true,
                    },
                    {
                        no: '1',
                        name: '小明',
                        projectName: '竞赛管理平台',
                        teamName:'12456',
                        mail:'857723555@qq.com',
                        isSubmit:{
                            first: {state:false, name:'初赛'},
                            second:{state:false, name:'复赛'},
                            third:{state:false, name:'决赛'}
                        },
                        isPromote:{
                            first: {state:false, name:'初赛'},
                            second:{state:false, name:'复赛'},
                            third:{state:false, name:'决赛'}
                        },
                        isCheck:true,
                    },
                    {
                        no: '1',
                        name: '小明',
                        projectName: '竞赛管理平台',
                        teamName:'12456',
                        mail:'857723555@qq.com',
                        isSubmit:{
                            first: {state:false, name:'初赛'},
                            second:{state:false, name:'复赛'},
                            third:{state:false, name:'决赛'}
                        },
                        isPromote:{
                            first: {state:false, name:'初赛'},
                            second:{state:false, name:'复赛'},
                            third:{state:false, name:'决赛'}
                        },
                        isCheck:true,
                    },
                    {
                        no: '1',
                        name: '小明',
                        projectName: '竞赛管理平台',
                        teamName:'12456',
                        mail:'857723555@qq.com',
                        isSubmit:{
                            first: {state:false, name:'初赛'},
                            second:{state:false, name:'复赛'},
                            third:{state:false, name:'决赛'}
                        },
                        isPromote:{
                            first: {state:false, name:'初赛'},
                            second:{state:false, name:'复赛'},
                            third:{state:false, name:'决赛'}
                        },
                        isCheck:true,
                    },
                ],
                editForm:{
                    teamID:'',
                    name:'',
                    teamName:'',
                    projectName:'',
                    mail:'',
                    isSubmit:{
                        first: {state:true, name:'初赛'},
                        second:{state:false, name:'复赛'},
                        third:{state:false, name:'决赛'}
                    },
                    isPromote:{
                        first: {state:true, name:'初赛'},
                        second:{state:false, name:'复赛'},
                        third:{state:false, name:'决赛'}
                    },
                    authority:{
                        first:{state: true, name:'权限1'},
                        second:{state: false, name:'权限2'}
                    },
                    projectCheck:false,
                }

            };
        },
        methods: {
            current_change:function (currentPage) {
                this.currentPage = currentPage;
            },
            handleEdit:function () {
                this.dialogVisible = true;
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
            submitEditForm:function () {

            }
            // handleConform:function (index) {
            //     this.tableData[index].isSet = false;
            // },
            // handleCancel:function (index) {
            //     this.tableData[index].isSet = false;
            // }

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