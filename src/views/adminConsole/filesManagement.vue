<template>
    <div id="filesManagement">
        <el-form>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="文件类型">
                        <el-select v-model="fileType" placeholder="请选择" size="small">
                            <el-option
                                    v-for="item in typeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="关键字">
                        <el-select v-model="keyWord" placeholder="搜索关键字" size="small" style="width: 120px">
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
                style="width: 100%">
            <el-table-column
                    type="selection"
                    width="50"
                    align="center">
            </el-table-column>

            <el-table-column
                    prop="fileName"
                    label="文件名称"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>

            <el-table-column
                    prop="editTime"
                    label="修改时间"
                    width="200"
                    align="center">
            </el-table-column>

            <el-table-column
                    label="操作"
                    width="200"
                    align="center">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="deleteFile(scope.$index)">删除</el-button>
                    <el-button
                            size="mini"
                            @click="downloadFile(scope.$index)">下载</el-button>
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
                        :total="totalPage"
                        @current-change="current_change">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "filesManagement",
        data() {
            return {
                fileType:'',//文件类型
                //文件类型列表
                typeOptions:[
                    {value:'选项1' , label:"文档"},
                    {value:'选项2' , label:"图片"},
                    {value:'选项3' , label:"视频"},
                    {value:'选项4' , label:"其他"},
                ],
                //搜索关键字
                keyWord:'',
                //文件数据
                tableData:[
                    {
                        fileName: '我的资源',
                        editTime:'2016-06-08 08:08',
                    }
                ],
                currentPage:1,//当前页数
                total:1, //文件数量
            }
        },
        computed:{
            totalPage: function () {
                return this.total
            }
        },
        methods:{
            deleteFile:function (index) {
                console.log(index)
            },
            downloadFile:function (index) {
                console.log(index)
            },
            current_change:function (currentPage) {
                this.currentPage = currentPage;
            }
        }
    }
</script>

<style lang="scss" scoped>
    #filesManagement {
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