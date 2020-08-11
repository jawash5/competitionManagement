<template>
    <div id="adminManagement">
        <head-login></head-login>
        <div id="wrap">
            <admin-menu></admin-menu>
            <div id="teamManagement">

                <div id="teamPromotion">
                    <el-table
                            ref="multipleTable"
                            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                            tooltip-effect="dark"
                            style="width: 100%">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                type="index"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="no"
                                label="队伍序号"
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
                                prop="teamName"
                                label="队伍名称"
                                width="120"
                                show-overflow-tooltip>
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
                                width="80">
                        </el-table-column>
                        <el-table-column
                                prop="Promotion"
                                label="晋级情况"
                                width="80">
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
                                        @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
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
                tableData: [
                    {
                        no: '1',
                        name: '小明',
                        projectName: '竞赛管理平台',
                        teamName:'12456',
                        mail:'857723555@qq.com',
                        submit:'是',
                        Promotion:'是',
                    },
                    {
                        no: '1',
                        name: '小明',
                        projectName: '竞赛管理平台',
                        teamName:'12456',
                        mail:'857723555@qq.com',
                        submit:'是',
                        Promotion:'是',
                    },
                    {
                        no: '1',
                        name: '小明',
                        projectName: '竞赛管理平台',
                        teamName:'12456',
                        mail:'857723555@qq.com',
                        submit:'是',
                        Promotion:'是',
                    },
                ],

            };
        },
        methods: {
            current_change:function (currentPage) {
                this.currentPage = currentPage;
            }
        }
    }
</script>

<style scoped src="../styles/adminManagement/teamManagement.css">

</style>