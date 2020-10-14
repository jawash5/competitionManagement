<template>
    <div>
        <el-dialog :visible="visible"
                    title="上传文件"
                    width="500px"
                    :show-close="false"
                    center>
            <div class="form">
                <el-form ref="form" label-width="80px">
                    <el-form-item label="文件类型">
                        <el-radio v-model="fileType" label="1">技术组</el-radio>
                        <el-radio v-model="fileType" label="2">商务组</el-radio>
                    </el-form-item>

                    <el-form-item label="文件上传">
                        <el-upload
                                action="#"
                                :limit="1"
                                :file-list="fileList"
                                :on-change="handleFileChange"
                                :on-remove="handleRemove"
                                :auto-upload="false">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传 PDF 文件，且不超过10MB</div>
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
                dialogVisible: false,
                file:'',//文件
                fileType:'',//文件类型
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
                this.fileType = '';
                this.fileList = []
            },
            //上传文件
            uploadFile() {
                const isPDF = this.file.type === 'application/pdf';
                const isLt10M = this.file.size / 1024 / 1024 < 10;

                if (!isPDF) {
                    this.$message.error('上传文件只能是 PDF 格式!');
                    return false;
                }
                if (!isLt10M) {
                    this.$message.error('上传文件大小不超过 10MB!');
                    return false;
                }

                this.$confirm('文件上传后会覆盖团队之前提交的文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const data = new FormData();

                    data.append('file', this.file);
                    data.append('competitionId', this.competitionId);
                    data.append('stageId', this.stageId);
                    data.append('groupId', this.groupId);
                    data.append('type', this.fileType);

                    upload(data).then(response => {
                        this.$message.success(response.data.data);
                        this.dialogClose();
                    }).catch(error => {
                        this.$message.error(error.response.data)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消上传'
                    });
                    this.competitionStages = '';
                    this.fileType = '';
                    this.file = '';
                    this.fileList = [];
                    this.competitionId = '';
                    this.dialogClose();
                });
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