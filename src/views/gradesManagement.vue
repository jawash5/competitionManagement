<template>
    <div id="adminManagement">
        <head-login></head-login>
        <div id="wrap">
            <admin-menu active="gradesManagement"></admin-menu>
            <div id="gradesManagement">
                <div id="competitionSelect">
                    <el-select v-model="competitionValue" placeholder="请选择比赛" style="float: left">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button id="releaseResults" type="success" size="small" @click="releaseResults">发布成绩</el-button>
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
                                prop="no"
                                label="序号"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="projectName"
                                label="项目名称"
                                width="200"
                                show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="队长姓名"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="mail"
                                label="队伍邮箱"
                                width="180"
                                show-overflow-tooltip>
                        </el-table-column>

                        <el-table-column
                                prop="submit"
                                label="上交情况"
                                width="70">
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
                                width="70">
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
                                width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.isSet">
                                    <el-input size="mini" v-model="tableData[scope.$index].grades" maxlength="3">
                                    </el-input>
                                </span>
                                <span v-else>{{ tableData[scope.$index].grades }}</span>
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
        name: "gradesManagement",
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

<style scoped src="../styles/adminManagement/gradesManagement.css">

</style>