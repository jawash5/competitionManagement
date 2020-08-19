<template>
    <div id="adminManagement">
        <head-login></head-login>
        <div id="wrap">
            <admin-menu active="gradesManagement"></admin-menu>
            <div id="teamManagement">
                <div id="teamPromotion">
                    <el-table
                            ref="multipleTable"
                            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection"
                                width="55">
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
                                label="得分"
                                width="80">
                            <template slot-scope="scope">
                                <el-input v-model="tableData[scope.$index].grades" maxlength="3"></el-input>
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
                                晋级情况
                                <el-checkbox v-model="tableData[scope.$index].promotion">
                                </el-checkbox>
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
                multipleSelection: [],
                tableData: [
                    {
                        no: '1',
                        name: '小明',
                        projectName: '竞赛管理平台',
                        teamName:'12456',
                        mail:'857723555@qq.com',
                        submit:'是',
                        grades:"80",
                        promotion:true,
                    },
                ],

            };
        },
        methods: {
            current_change:function (currentPage) {
                this.currentPage = currentPage;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
        }
    }
</script>

<style scoped src="../styles/adminManagement/gradesManagement.css">

</style>