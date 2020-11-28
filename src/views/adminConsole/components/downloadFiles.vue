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
                <el-radio v-model="fileType" label="技术组">技术组</el-radio>
                <el-radio v-model="fileType" label="商务组">商务组</el-radio>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogClose">取 消</el-button>
                <el-button type="primary" @click="conform">确 定</el-button>
            </div>
        </el-dialog>

        <progress-loading :visible.sync="loading"
                          :is-finished.sync="finish"></progress-loading>

    </div>
</template>

<script>
    import {downloadFile,checkStatus} from "@/api/adminConsole";
    import progressLoading from "@/components/progressLoading";

    export default {
        name: "downloadFiles",
        components:{progressLoading},
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
              loading: false,
              finish: false,
          }
        },
        methods:{
            dialogClose() {
                this.$emit("update:visible",false);
            },
            //下载文件
            conform() {
                const data = {
                    stageId: this.stage,
                    type: this.fileType
                }
                downloadFile(data).then( response => {
                    const fileName = response.data.data;
                    this.loading = true;
                    this.getStatus(fileName).then(response => {
                        if(response === false) {
                            const data = new FormData;
                            data.append('fileName',fileName);

                            const status = setInterval(() => {
                                checkStatus(data).then( response => {
                                    let res = response.data.data
                                    if (res === '下载中') {
                                        return false;
                                    } else {
                                        this.finish = true;//下载完成，加速进度条
                                        const url = res.replace('-internal', '');
                                        console.log(url);
                                        window.open( url, '_blank');
                                        clearInterval(status);
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
                            this.finish = true;//下载完成，加速进度条
                            const url = res.replace('-internal', '');
                            console.log(url);
                            window.open( url, '_blank');
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