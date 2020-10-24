<template>
    <div>
        <el-dialog :visible="visible"
                   title="文件下载"
                   width="420px"
                   center
                   :show-close="false"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="pull-center">
                <el-radio v-model="fileType" label="1">技术组</el-radio>
                <el-radio v-model="fileType" label="2">商务组</el-radio>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogClose">取 消</el-button>
                <el-button type="primary" @click="conform">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {downloadFile,checkStatus} from "@/api/adminConsole";

    export default {
        name: "downloadFiles",
        props:{
            visible:{
                type:Boolean,
                require:true,
                default:false,
            },
            stage:{
                require:true,
            }
        },
        data() {
          return {
              fileType:'',
          }
        },
        methods:{
            dialogClose() {
                this.$emit("update:dialogClose",false);
            },
            //下载文件
            conform() {
                const data = {
                    stageId: this.stage,
                    type: this.fileType
                }
                downloadFile(data).then( response => {
                    const fileName = response.data.data;
                    this.$message({
                        message:'后台玩命压缩中...请稍等...',
                        duration: 3000
                    })

                    this.getStatus(fileName).then(response => {
                        if(response === false) {
                            const status = setInterval(function () {
                                const data = new FormData;
                                data.append('fileName',fileName);

                                checkStatus(data).then( response => {
                                    const res = response.data.data
                                    if (res === '下载中') {
                                        return false;
                                    } else {
                                        clearInterval(status);
                                        window.open(res.replace('-internal', ''), '_blank')
                                    }
                                })
                            }, 3000);
                        }
                    })
                }).finally( ()=> {
                    this.dialogClose();
                });
            },
            //获取状态
            getStatus(fileName) {
                return new Promise((resolve) =>  {
                    const data = new FormData;
                    data.append('fileName',fileName);

                    checkStatus(data).then( response => {
                        const res = response.data.data
                        if (res === '下载中') {
                            resolve(false);
                        } else {
                            window.open(res, '_blank');
                            resolve(true);
                        }
                    })
                })

            }
        }
    }
</script>

<style scoped>

</style>