<template>
    <div>
        <el-dialog :visible="visible"
                   title="文件下载"
                   width="500px"
                   center
                   :show-close="false"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
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
              loading: false,
          }
        },
        methods:{
            dialogClose() {
                this.$emit("update:dialogClose",false);
            },
            //下载文件
            conform() {
                const data = {
                    stage: this.stage,
                    type: this.fileType
                }

                downloadFile(data).then( response => {
                    if(response.data.data.success === true) {
                        const url = response.data.data.msg;
                        window.open(url, '_blank', )
                    } else {
                        this.$message.error(response.data.data.msg)
                    }

                }).finally( ()=> {
                    this.loading = false;
                    this.dialogClose();
                })
            },
        }
    }
</script>

<style scoped>

</style>