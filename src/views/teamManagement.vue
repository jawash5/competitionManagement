<template>
    <div id="adminManagement">
        <head-login></head-login>
        <div id="wrap">
            <admin-menu active="teamManagement"></admin-menu>
            <div id="teamManagement">
                <div id="competitionSelect">
                    <el-select v-model="competitionValue" placeholder="请选择比赛">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <div id="teamPromotion">
                    <el-table
                            ref="multipleTable"
                            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                            tooltip-effect="dark"
                            style="width: 100%">
                        <el-table-column
                                type="selection"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                type="index"
                                width="50">
                        </el-table-column>
                        <el-table-column v-for="item in titleData" :key="item.id"
                                :prop="item.prop"
                                :label="item.label"
                                :width="item.width">
                            <template slot-scope="scope">
                                <span v-if="scope.row.isSet">
                                    <el-input size="mini" v-model="tableData[scope.$index][item.prop]">
                                    </el-input>
                                </span>
                                <span v-else>{{tableData[scope.$index][item.prop]}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="right">
                            <template slot="header">
                                <el-input
                                        v-model="search"
                                        size="mini"
                                        placeholder="输入关键字搜索"/>
                            </template>
                            <template slot-scope="scope">
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
                </div>

                <div id="page">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="total"
                            @current-change="current_change">
                    </el-pagination>
                </div>

            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import headLogin from "@/components/headLogin";
    import myFooter from "@/components/myFooter";
    import adminMenu from "@/components/adminMenu";

    export default {
        name: "teamManagement",
        components: {
            'headLogin': headLogin,
            'myFooter': myFooter,
            'adminMenu':adminMenu
        },
        data() {
            return {
                statement:false,
                search:'',
                currentPage:1,
                total: 1,
                edit:false,
                options: [{
                    value: '选项1',
                    label: '电子商务竞赛'
                }],
                competitionValue: '',
                titleData:[
                    { prop:"no", label:"队伍序号", width:"70"},
                    { prop:"projectName", label:"项目名称", width:"200"},
                    { prop:"name", label:"队长姓名", width:"100"},
                    { prop:"teamName", label:"队伍名称", width:"120"},
                    { prop:"mail", label:"队伍邮箱", width:"180"},
                    { prop:"submit", label:"上交情况", width:"70"},
                    { prop:"promotion", label:"晋级情况", width:"70"},
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

<style scoped src="../styles/adminManagement/teamManagement.css">

</style>