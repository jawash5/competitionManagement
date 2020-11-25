<template>
    <div>
        <el-dialog :visible="visible"
                    title="上传文件"
                    width="420px"
                    :show-close="false"
                    center>
            <div class="form">
                <el-form ref="form" label-width="80px">
                    <el-form-item label="项目名称">
                        <el-input v-model="projectName"></el-input>
                    </el-form-item>

                    <el-form-item label="文件上传">
                        <el-upload
                                action="#"
                                :limit="1"
                                :file-list="fileList"
                                :on-change="handleFileChange"
                                :on-remove="handleRemove"
                                :on-exceed="handleExceed"
                                :auto-upload="false">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip" style="line-height: 20px">只能上传 PDF 文件，且不超过10MB,
                                <br/>重复上传会覆盖之前的文件</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogClose">取 消</el-button>
                <el-button type="primary" @click="uploadFile">确 定</el-button>
            </span>
        </el-dialog>
        <progress-loading :visible.sync="loading"
                          :is-finished.sync="finish"></progress-loading>
    </div>
</template>

<script>
    import {upload} from "@/api/userConsole";
    import progressLoading from "@/components/progressLoading";

    export default {
        name: "upload",
        components:{progressLoading},
        data() {
            return {
                projectName:'',//项目名称
                dialogVisible: false,
                file:'',//文件
                fileList:[],//文件列表
                loading: false,
                finish:false,
            }
        },
        props:{
            visible:{
                required:true,
                type:Boolean
            },
            groupId:{
                required:true,
            },
            competitionId: {
                required:true,
            },
            stageId: {
                required:true,
            }
        },
        methods:{
            dialogClose() {
                this.$emit('update:visible',false);
                this.file = '';
                this.projectName = ''
                this.fileList = []
            },
            //上传文件
            uploadFile() {
                if (this.projectName === '' || this.file === '') {
                    this.$message('信息填写不完整')
                    return false;
                }

                const isPDF = this.file.type === 'application/pdf';
                const isZIP = this.file.type === 'application/x-zip-compressed';
                const isLt50M = this.file.size / 1024 / 1024 < 50;

                if (!isPDF && !isZIP) {
                    this.$message.error('上传文件只能是 PDF 或 ZIP 格式!');
                    return false;
                }
                // if (!isPDF) {
                //     this.$message.error('上传文件只能是 PDF 格式!');
                //     return false;
                // }
                if (!isLt50M) {
                    this.$message.error('上传文件大小不超过 50MB!');
                    return false;
                }
                const data = new FormData();
                data.append('file', this.file);
                data.append('stageId', this.stageId);
                data.append('groupId', this.groupId);
                if (isPDF) {
                    data.append('fileName', this.projectName + '.pdf')
                }
                // else if (isZIP) {
                //     data.append('fileName', this.projectName + '.zip')
                // }
                this.loading = true;
                upload(data).then(response => {
                    this.finish = true;
                    this.$emit('success')
                    this.$message.success(response.data.data);
                    this.dialogClose();
                }).catch(error => {
                    this.$message.error(error.response.data)
                })
            },
            //文件状态改变时
            handleFileChange(file) {
                this.file = file.raw;
            },
            //删除文件
            handleRemove() {
                this.file = '';
            },
            handleExceed() {
                this.$message('只能上传一个文件');
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>