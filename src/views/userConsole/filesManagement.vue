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
                <el-col :span="12">
                    <el-form-item>
                        <el-select v-model="searchKeyValue" placeholder="搜索关键字" size="small" style="width: 120px">
                            <el-option
                                    v-for="item in searchOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input placeholder="请输入搜索内容" v-model="search" size="small" style="width: 180px; margin-left: 10px"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="4">
                    <el-button type="danger"
                               size="small"
                               class="pull-right classButton"
                               @click="uploadFile()">上传文件</el-button>
                </el-col>
            </el-row>
        </el-form>

        <upload :visible="uploadDialog" @dialogClose="uploadDialog = false" @uploadSuccess="getFiles()"></upload>

        <el-table
                ref="multipleTable"
                :data="searchFiles()"
                stripe
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
                    prop="competitionName"
                    label="比赛名称"
                    width="200"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>

            <el-table-column
                    prop="year"
                    label="比赛年"
                    width="100"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="stage"
                    label="阶段"
                    width="100"
                    align="center">
            </el-table-column>

            <el-table-column
                    prop="type"
                    label="文件类型"
                    width="100"
                    align="center">
                <template slot-scope="scope">
                    <span>{{ tableData[scope.$index].type === '1' ? '报名表' : '作品'}}</span>
                </template>
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
    import upload from "@/views/userConsole/components/upload";
    import {checkFiles,deleteFiles} from "@/api/userConsole";
    export default {
        name: "filesManagement",
        components:{upload},
        data() {
            return {
                fileType:'选项1',//文件类型
                //文件类型列表
                typeOptions:[
                    {value:'选项1' , label:"全部"},
                    {value:'选项2' , label:"文档"},
                    {value:'选项3' , label:"图片"},
                    {value:'选项4' , label:"视频"},
                    {value:'选项5' , label:"其他"},
                ],
                //搜索关键字
                searchKeyValue:'fileName',
                //搜索选项列表
                searchOptions:[
                    {value:'fileName' , label:"文件名称"},
                    {value:'competitionName' , label:"比赛名称"},
                    {value:'year' , label:"比赛年"},
                    {value:'stage' , label:"阶段"},
                ],
                search:'',//搜索内容
                //文件数据
                tableData:JSON.parse(sessionStorage.getItem('tableData')) ||
                    [{"competitionName": "",
                    "year": "",
                    "stage": "",
                    "groupId": '',
                    "fileName": "",
                    "type": ""}],
                currentPage:1,//当前页数
                total:1, //文件数量
                uploadDialog:false,//上传文件对话框
            }
        },
        computed:{
            totalPage() {
                return this.total
            }
        },
        methods:{
            deleteFile (index) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteFiles(this.tableData[index]).then( () => {
                        this.$message.success('删除成功！');
                        this.getFiles();
                    }).catch( error => {
                        this.$message.error(error.response.data);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            downloadFile:function (index) {
                console.log(index)
            },
            current_change:function (currentPage) {
                this.currentPage = currentPage;
            },
            //上传文件对话框
            uploadFile(){
                this.uploadDialog = true;
            },
            //更新文件列表
            getFiles() {
                checkFiles().then( response => {
                    this.tableData = response.data.data;
                }).catch( error => {
                    this.$message.error(error.response.data)
                })
            },
            //初始化文件列表
            initFiles() {
                checkFiles().then( response => {
                    this.tableData = response.data.data;
                    sessionStorage.setItem('tableData', JSON.stringify(this.tableData));
                }).catch( error => {
                    this.$message.error(error.response.data)
                })
            },
            //搜索文件
            searchFiles() {
                if(this.searchKeyValue === 'fileName') {
                    return this.tableData.filter(data => !this.search || data.fileName.toLowerCase().includes(this.search.toLowerCase()));
                } else if (this.searchKeyValue === 'competitionName') {
                    return this.tableData.filter(data => !this.search || data.competitionName.toLowerCase().includes(this.search.toLowerCase()))
                } else if (this.searchKeyValue === 'year') {
                    return this.tableData.filter(data => !this.search || data.year.toLowerCase().includes(this.search.toLowerCase()))
                } else if (this.searchKeyValue === 'stage') {
                    return this.tableData.filter(data => !this.search || data.stage.toLowerCase().includes(this.search.toLowerCase()))
                }
            }
        },
        mounted() {
            this.initFiles();
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