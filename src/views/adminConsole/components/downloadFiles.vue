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
              url:'',
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
                    year: this.year,
                    stage: this.stage,
                    type: this.fileType
                }

                downloadFile(data).then( response => {
                    this.url = response.data.data;
                    this.loading = false;
                    this.dialogClose();
                    window.open(this.url, '_blank', )
                })
            },
        }
    }
</script>

<style scoped>

</style>