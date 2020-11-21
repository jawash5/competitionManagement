<template>
    <div class="formDesign">
        <div class="title">基本信息
            <el-button class="pull-right"
                       type="danger"
                       v-show="!isEdit.basicInfo"
                       @click="isEdit.basicInfo = true">修改信息</el-button>
            <el-button class="pull-right"
                       type="danger"
                       v-show="isEdit.basicInfo"
                       @click="editBasicInfo">确认修改</el-button>
        </div>
        <div class="div-30"></div>
        <el-card>
            <el-form ref="form" :disabled="!isEdit.basicInfo" :model="form" label-width="100px" class="elForm">
                <el-form-item label="比赛年">
                    <el-input placeholder="请输入比赛年" style="width: 150px" v-model="form.year" maxlength="4"></el-input>
                </el-form-item>

                <el-form-item label="比赛时间">
                    <el-date-picker
                            v-model="form.allTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="人数限制">
                    <el-input class="peopleLimited" v-model="form.signForm.minPeople" maxlength="2" placeholder="最少人数"></el-input>
                    <span style="margin:0 5px">至</span>
                    <el-input class="peopleLimited" v-model="form.signForm.maxPeople" maxlength="2" placeholder="最大人数"></el-input>
                </el-form-item>

                <el-form-item label="背景图片">
                    <el-upload
                            action="#"
                            :limit="1"
                            :on-change="fileChange"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :auto-upload="false">
                        <el-button size="small" type="primary">重新上传</el-button>
                        <div slot="tip" class="el-upload__tip">至多上传一张图片</div>
                    </el-upload>
                </el-form-item>
            </el-form>
        </el-card>

        <div class="div-60"></div>
        <div class="title">阶段信息</div>
        <div class="div-30"></div>

        <el-card class="formCard" v-for="i in num" :key="i">
            <div class="pull-center">
                <el-tag>{{i}}</el-tag>
                <el-input
                        placeholder="请输入赛事阶段名称"
                        v-model="inputBT[i-1]"
                        clearable
                        :disabled="!isEdit.stageInfo[i-1]"
                        style="width: 50%; margin-left: 30px">
                </el-input>

                <label for="" style="margin-right: 10px;margin-left: 5%">上传文件</label>
                <el-switch v-model="form.requireUploadFile[i-1]"
                           :disabled="!isEdit.stageInfo[i-1]"></el-switch>

                <el-button type="danger"
                           round
                           size="small"
                           @click="deleteDiv(i-1)"
                           style=" margin-left: 5%">删除阶段</el-button>
                <el-button type="success"
                           round
                           v-show="!isEdit.stageInfo[i-1]"
                           size="small"
                           @click="isEdit.stageInfo.splice(i-1,1,true)">修改内容</el-button>
                <el-button type="primary"
                           round
                           v-show="isEdit.stageInfo[i-1]"
                           size="small"
                           @click="modifyStage(i-1)">确认修改</el-button>

            </div>
            <el-divider></el-divider>
            <div class="pull-center">
                <label for="" style="margin-right: 20px">阶段持续时间</label>
                <el-date-picker
                        v-model="form.competitionTime[i-1].stageTime"
                        type="datetimerange"
                        :disabled="!isEdit.stageInfo[i-1]"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="changStageTime"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>

                <div class="div-15"></div>
                <div v-show="form.requireUploadFile[i-1]">
                    <label for="" style="margin-right: 20px">作品提交时间</label>
                    <el-date-picker
                            v-model="form.competitionTime[i-1].uploadTime"
                            type="datetimerange"
                            :disabled="!isEdit.stageInfo[i-1]"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="changUploadTime"
                            value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </div>
            </div>
        </el-card>

        <div class="addCard">
            <el-tooltip class="item" effect="light" content="添加阶段" placement="top">
                <el-button type="text" @click="addDivVisible = true" style="font-size: 30px;">
                    <i class="el-icon-circle-plus"></i>
                </el-button>
            </el-tooltip>
        </div>

        <el-dialog
                title="新增阶段"
                :visible.sync="addDivVisible"
                center
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :destroy-on-close="true"
                width="600px">
            <div style="text-align: center">
                <label for="">阶段名称</label>
                <el-input
                        placeholder="请输入赛事阶段名称"
                        v-model="newStage.name"
                        clearable
                        style="width: 50%; margin-left: 20px">
                </el-input>
                <label for="" style="margin-right: 10px;margin-left: 50px">上传文件</label>
                <el-switch v-model="newStage.requireUploadFile"></el-switch>
                <el-divider></el-divider>
                <label for="" style="margin-right: 20px">阶段持续时间</label>
                <el-date-picker
                        v-model="newStage.stageTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>

                <div class="div-15" v-show="newStage.requireUploadFile">
                    <label for="" style="margin-right: 20px">作品提交时间</label>
                    <el-date-picker
                            v-model="newStage.uploadTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDivVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDiv">确 定</el-button>
            </span>
        </el-dialog>

        <div class="div-60"></div>
        <div class="title">介绍信息<span v-show="isEdit.descInfo">（提交前请保存）</span>
            <el-button class="pull-right"
                       type="danger"
                       v-show="!isEdit.descInfo"
                       @click="isEdit.descInfo = true">修改信息</el-button>
            <el-button class="pull-right"
                       type="primary"
                       v-show="isEdit.descInfo"
                       @click="editDescInfo">确认修改</el-button>
        </div>
        <div class="div-30"></div>

        <el-card class="formCard" v-show="!isEdit.descInfo" >
            <div class="markdown-body" v-html="content"></div>
        </el-card>
        <editor v-show="isEdit.descInfo" @content="getContent" year="2019" :initValue="form.information"></editor>

    </div>
</template>

<script>
    import editor from "@/components/editor";
    import {competitionDetail} from "@/api/login";
    import {addStage, deleteStage, editBasicInfo, editDescInfo, modifyStage} from "@/api/adminConsole";
    import {mavonEditor} from 'mavon-editor';
    import 'mavon-editor/dist/css/index.css';

    export default {
        name: "editCompetitionInfo",
        components: {
            'editor':editor,
        },
        data() {
            return {
                form:{
                    year:'',
                    session:'',
                    allTime: [],
                    competitionTime: [
                        {id:'', stageTime: [], uploadTime: ''},
                    ],
                    requireUploadFile:[false],
                    information:'',
                    signForm:{
                        maxPeople: '',
                        minPeople: '',
                        requireGroupName: false
                    }
                },
                fileList:[],
                file:'', //上传的图片
                num: 1, // 卡片的数量
                inputBT:['报名阶段'], //输入框
                isEdit:{
                    basicInfo: false,
                    stageInfo: [false],
                    descInfo: false
                },
                addDivVisible: false,
                newStage:{
                    name:'',
                    stageTime:'',
                    uploadTime:'',
                    requireUploadFile: false
                }
            }
        },
        computed:{
            content() {
                let markdownIt = mavonEditor.getMarkdownIt()
                return markdownIt.render(this.form.information)
            },
        },
        methods: {
            fileChange() {
                console.log(11)
            },
            handleRemove() {
                console.log(11)

            },
            addDiv() {
                const requireUploadFile = this.newStage.requireUploadFile;
                const stageData = this.newStage;
                let data;
                if (requireUploadFile) {
                    data = {
                        competitionId: this.$route.query.id,
                        start: stageData.stageTime[0],
                        end: stageData.stageTime[1],
                        uploadStart: stageData.uploadTime[0],
                        uploadEnd: stageData.uploadTime[1],
                        requireUpload: true,
                        name: stageData.name
                    }
                } else {
                    data = {
                        competitionId: this.$route.query.id,
                        start: stageData.stageTime[0],
                        end: stageData.stageTime[1],
                        requireUpload: false,
                        name: stageData.name
                    }
                }
                addStage(data).then( () => {
                    this.$message.success('添加成功')
                    this.addDivVisible = false;
                    this.newStage = {
                        name:'',
                        stageTime:'',
                        uploadTime:'',
                        requireUploadFile: false
                    }
                    this.getInfo();
                }).catch( error => {
                    this.$message.error(error.response.data);
                })

            },
            //删除阶段
            deleteDiv(index) {
                this.$confirm('此操作将永久删除该阶段, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = new FormData;
                    data.append('stageId', this.form.competitionTime[index].id);
                    deleteStage(data).then( () => {
                        this.$message.success('删除成功');
                        this.getInfo();
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
            changStageTime(value) {
                console.log(value)
            },
            changUploadTime(value) {
                console.log(value)
            },
            modifyStage(index) {
                let newForm = this.form;
                let data;
                if (newForm.requireUploadFile[index]) {
                    data = {
                        stageId: newForm.competitionTime[index].id,
                        start: newForm.competitionTime[index].stageTime[0],
                        end: newForm.competitionTime[index].stageTime[1],
                        requireUpload: true,
                        uploadStart: newForm.competitionTime[index].uploadTime[0],
                        uploadEnd: newForm.competitionTime[index].uploadTime[1]
                    }
                } else {
                    data = {
                        stageId: newForm.competitionTime[index].id,
                        start: newForm.competitionTime[index].stageTime[0],
                        end: newForm.competitionTime[index].stageTime[1],
                        requireUpload: false,
                    }
                }
                modifyStage(data).then( () => {
                    this.$message.success('修改成功');
                    this.getInfo();
                }).catch( error => {
                    this.$message.error(error.response.data);
                })
            },
            //获取editor内容
            getContent(data) {
                this.form.information = data;
            },
            getInfo() {
                const competitionId = this.$route.query.id;
                if (competitionId) {
                    competitionDetail(competitionId).then( response => {
                        const primaryInfo = response.data.data;
                        let newForm = this.form;
                        newForm.year = primaryInfo.year;
                        newForm.session = primaryInfo.session;
                        newForm.allTime=[new Date(primaryInfo.start), new Date(primaryInfo.end)];
                        newForm.signForm = primaryInfo.signForm;
                        newForm.mainImage = primaryInfo.mainImage;
                        newForm.information = primaryInfo.information;
                        primaryInfo.stages.sort((a, b) => {
                            const data1 = new Date(a['startDate']).getTime();
                            const data2 = new Date(b['startDate']).getTime();
                            return data1 - data2
                        })
                        this.num = primaryInfo.stages.length;
                        this.isEdit.stageInfo = [];

                        for (let i=0; i<primaryInfo.stages.length; i++) {
                            this.isEdit.stageInfo.push(false)
                            this.inputBT[i] = primaryInfo.stages[i].name;
                            newForm.competitionTime.push( {id:'', stageTime: [], uploadTime: ''})
                            newForm.competitionTime[i].id = primaryInfo.stages[i].id;
                            newForm.competitionTime[i].stageTime = [new Date(primaryInfo.stages[i].startDate),
                                new Date(primaryInfo.stages[i].endDate)];
                            if (primaryInfo.stages[i].requireUploadFile) {
                                newForm.requireUploadFile[i] = true;
                                newForm.competitionTime[i].uploadTime = [new Date(primaryInfo.stages[i].uploadStartDate),
                                    new Date(primaryInfo.stages[i].uploadEndDate)];
                            } else {
                                newForm.requireUploadFile[i] = false;
                                newForm.competitionTime[i].uploadTime = '';
                            }
                        }
                    })
                }
            },
            //修改基本信息
            editBasicInfo() {
                const data = {
                    competitionId: this.$route.query.id,
                    year: this.form.year,
                    start: this.form.allTime[0],
                    end: this.form.allTime[0],
                    session: this.form.session,
                    signForm: {
                        maxPeople: this.form.signForm.maxPeople,
                        minPeople: this.form.signForm.minPeople
                    },
                }
                editBasicInfo(data)
            },
            editDescInfo() {
                const data = new FormData;
                data.append('des', this.form.information);
                data.append('competitionId', this.$route.query.id + '');

                editDescInfo(data).then( () => {
                    this.$message.success('修改成功');
                    this.isEdit.descInfo = false;
                }).catch( error => {
                    this.$message.error(error.response.data);
                })

            }

        },
        mounted() {
            this.getInfo();
            window.scrollTo(0,0)
        }
    }
</script>

<style lang="scss" scoped>
    .formDesign {
        margin: 0 auto;
        padding: 50px;

        .peopleLimited {
            width: 8vw;
        }
    }

    .title {
        font-size: 2vw;
        text-align: center;
        color: #606266;
    }

    .elForm {
        width: 48vw;
        margin: 0 auto;
    }

    .formCard {
        /*margin-left: 100px;*/
        min-height: 150px;
        margin-top: 30px;

        /deep/.radio .el-input__inner {
            width: 220px;
            border-top-width: 0;
            border-left-width: 0;
            border-right-width: 0;
            border-bottom-width: 1px;
            /*outline: medium;*/
        }
        .radio1 .el-input__inner {
            width: 100%;
            border-top-width: 0;
            border-left-width: 0;
            border-right-width: 0;
            border-bottom-width: 1px;
            /*outline: medium;*/
        }
        .textarea .el-textarea__inner {
            width: 100%;
            border-top-width: 0;
            border-left-width: 0;
            border-right-width: 0;
            border-bottom-width: 1px;
            /*outline: medium;*/
        }
    }

    .addCard {
        text-align: right;
        margin-top: 10px;
    }



</style>