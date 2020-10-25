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

<!--                    <el-form-item label="文件类型">-->
<!--                        <el-radio v-model="fileType" label="1">技术组</el-radio>-->
<!--                        <el-radio v-model="fileType" label="2">商务组</el-radio>-->
<!--                    </el-form-item>-->

                    <el-form-item label="文件上传">
                        <el-upload
                                action="#"
                                :limit="1"
                                :file-list="fileList"
                                :on-change="handleFileChange"
                                :on-remove="handleRemove"
                                :auto-upload="false">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip" style="line-height: 20px">只能上传 PDF 文件，且不超过10MB,<br/>重复上传会覆盖之前的文件</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogClose">取 消</el-button>
                <el-button type="primary" @click="uploadFile">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {upload} from "@/api/userConsole";

    export default {
        name: "upload",
        data() {
            return {
                projectName:'',//项目名称
                dialogVisible: false,
                file:'',//文件
                fileType:'1',//文件类型
                fileList:[],//文件列表
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
                this.$emit('update:dialogClose',false);
                this.file = '';
                this.projectName = ''
                this.fileType = '';
                this.fileList = []
            },
            //上传文件
            uploadFile() {
                const isPDF = this.file.type === 'application/pdf';
                const isZIP = this.file.type === 'application/x-zip-compressed';
                const isLt10M = this.file.size / 1024 / 1024 < 10;

                if (!isPDF && !isZIP) {
                    this.$message.error('上传文件只能是 PDF 或 ZIP 格式!');
                    return false;
                }
                if (!isLt10M) {
                    this.$message.error('上传文件大小不超过 10MB!');
                    return false;
                }

                const data = new FormData();
                data.append('file', this.file);
                data.append('stageId', this.stageId);
                data.append('groupId', this.groupId);
                data.append('type', this.fileType);
                if (isPDF) {
                    data.append('fileName', this.projectName + '.pdf')
                } else if (isZIP) {
                    data.append('fileName', this.projectName + '.zip')
                }
                upload(data).then(response => {
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
        },
    }
</script>

<style lang="scss" scoped>

</style>