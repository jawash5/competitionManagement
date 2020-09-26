<template>
    <div>
        <el-dialog :visible="visible"
                    title="上传文件"
                    width="500px"
                    :show-close="false">
            <div class="form">
                <el-form ref="form" label-width="80px">
                    <el-form-item label="上传小组">
                        <el-select v-model="competitionId" placeholder="请选择" @change="getCompetitionDetail">
                            <el-option
                                    v-for="item in competitionOptions"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="比赛阶段">
                        <el-select v-model="competitionStages" placeholder="请选择">
                            <el-option
                                    v-for="item in competitionStagesOptions"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="文件类型">
                        <el-radio v-model="fileType" label="1">报名表</el-radio>
                        <el-radio v-model="fileType" label="2">作品</el-radio>
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
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                </el-form>

            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogClose()">取 消</el-button>
                <el-button type="primary" @click="uploadFile">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {competitionDetail} from "@/api/login";
    import {upload,checkGroup,checkStatus} from "@/api/userConsole";

    export default {
        name: "upload",
        data() {
            return {
                dialogVisible: false,
                groups:[],//加入的小组
                competitionId:'',//选中的比赛
                competitionName:'',//比赛名称
                competitionOptions:[],//比赛选项
                competitionStages:'',//选中的比赛阶段
                competitionStagesOptions:[],//比赛阶段选择
                year:'',//比赛年
                groupId:'',//队伍id
                file:'',//文件
                fileType:'',//文件类型
                fileList:[],//文件列表
            }
        },
        props:{
            visible:{
                required:true,
                type:Boolean
            }
        },
        methods:{
            dialogClose() {
                this.$emit('dialogClose')
            },
            //获取队伍列表
            getGroupList() {
                checkGroup().then(response => {
                    this.groups = response.data.data;
                    for(let i=0; i<this.groups.length; i++) {
                        this.competitionOptions.push({
                            value: this.groups[i].competitionId,
                            label: this.groups[i].name
                        })
                    }
                })
            },

            //获取比赛详情
            getCompetitionDetail(competitionId) {
                for(let i=0; i<this.groups.length; i++) {
                    if(competitionId === this.groups[i].competitionId) {
                        this.groupId = this.groups[i].id;
                    }
                }

                competitionDetail(competitionId).then(response => {
                    const competitionDetail = response.data.data;
                    this.competitionName = competitionDetail.name;
                    const competitionStages = competitionDetail.stages;
                    this.competitionStagesOptions = [];
                    for(let i=0; i<competitionStages.length; i++) {
                        this.competitionStagesOptions.push({label: competitionStages[i].name, value:competitionStages[i].name})
                    }
                    this.year = competitionDetail.year;

                }).catch(error => {
                    this.$message.error(error.response.data)
                })
            },
            //上传文件
            uploadFile() {
                const data = new FormData();

                data.append('file', this.file);
                data.append('competitionName', this.competitionName);
                data.append('year', this.year);
                data.append('stage', this.competitionStages);
                data.append('groupId', this.groupId);
                data.append('type', this.fileType);

                upload(data).then(response => {
                    const id = response.data.data;
                    this.checkStatus(id)
                    this.dialogClose();
                }).catch(error => {
                    this.$message.error(error.response.data)
                })

            },
            //判断状态
            checkStatus(id) {
                const data = new FormData();
                data.append('id', id);

                checkStatus(data).then(response => {
                    const res = response.data.data;
                    if(res === '成功') {
                        this.$message.success('上传成功！');
                        this.$emit('uploadSuccess');
                    } else if (res === '失败') {
                        this.$message.success('上传失败！');
                    } else {
                        this.checkStatus(id);
                    }
                })
            },
            //文件状态改变时
            handleFileChange(file) {
                this.file = file.raw;
                // console.log(this.file)
            },
            //删除文件
            handleRemove() {
                console.log(this.file)
                this.file = '';
            }

        },
        mounted() {
            this.getGroupList();
        }
    }
</script>

<style lang="scss" scoped>

</style>