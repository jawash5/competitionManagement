<template>
    <div>
        <el-dialog :visible="visible"
                   title="文件下载"
                   width="500px"
                   center
                   :show-close="false"
                   v-loading="loading">
            <el-radio v-model="fileType" label="1">报名表</el-radio>
            <el-radio v-model="fileType" label="2">作品</el-radio>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogClose">取 消</el-button>
                <el-button type="primary" @click="conform">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {downloadFile} from "@/api/adminConsole";
    import {checkStatus} from "@/api/userConsole";

    export default {
        name: "downloadFiles",
        props:{
            visible:{
                type:Boolean,
                require:true,
                default:false,
            },
            year:{
                type:String,
                require:true,
            },
            stage:{
                type:String,
                require:true,
            }
        },
        data() {
          return {
              fileType:'',
              url:'',
              flag:true,//判断是否访问超时
              loading: false,
          }
        },
        methods:{
            dialogClose() {
                this.$emit("dialogClose");
            },
            //下载文件
            conform() {
                const data = {
                    year: this.year,
                    stage: this.stage,
                    type: this.fileType
                }
                downloadFile(data).then( response => {
                    const id = response.data.data
                    const data = new FormData();
                    data.append('id', id);

                    this.checkStatus(data, this.flag);

                    setTimeout(() => {
                        this.flag = false
                        if(this.url === '') {
                            this.$message.error('文件阻塞,请稍后尝试！');
                        }
                    }, 10000);

                })
            },

            //判断文件状态
            checkStatus(data, flag){
                if(flag) {
                    checkStatus(data).then( response => {
                        const status = response.data.data;
                        if (status === '下载中') {
                            this.checkStatus(data, flag)
                            this.loading = true;
                        } else if (status === '失败') {
                            this.$message.error('下载失败');
                            this.loading = false;
                        } else {
                            this.url = status;
                            this.loading = false;
                            this.dialogClose();
                            window.open(this.url, '_blank', 'width=400, height=400')
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>