<template>
    <div class="competitionRelease">
        <div class="formDesign">
            <div class="title">基本信息</div>
            <div class="div-30"></div>
            <el-card>
                <el-form ref="form" :model="form" label-width="100px" class="elForm">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="比赛年">
                                <el-input placeholder="请输入比赛年" style="width: 150px" v-model="form.year" maxlength="4"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="届数">
                                <el-input placeholder="请输入届数" style="width: 150px" v-model="form.session" maxlength="3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
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

                    <el-form-item label="比赛标签">
                        <el-select v-model="form.tags" placeholder="请选择" multiple :multiple-limit="3">
                            <el-option
                                    v-for="item in tagList"
                                    :key="item.tagId"
                                    :label="item.tagName"
                                    :value="item.tagId">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="背景图片">
                        <el-upload
                                action="#"
                                :limit="1"
                                :on-change="fileChange"
                                :on-remove="handleRemove"
                                :file-list="fileList"
                                :auto-upload="false">
                            <el-button size="small" type="primary">点击上传</el-button>
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
                            class="stageName"
                            :disabled="!(i-1)"
                            placeholder="请输入赛事阶段名称"
                            v-model="inputBT[i-1]"
                            clearable
                            style="width: 50%; margin-left: 30px">
                    </el-input>
                    <label for="" style="margin-right: 10px;margin-left: 100px">上传文件</label>
                    <el-switch v-model="form.requireUploadFile[i-1]"></el-switch>
                </div>
                <el-divider></el-divider>
                <div class="pull-center">
                    <label for="" style="margin-right: 20px">阶段持续时间</label>
                    <el-date-picker
                            v-model="form.competitionTime[i-1].stageTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>

                    <div class="div-15"></div>
                    <label for=""
                           v-show="form.requireUploadFile[i-1]"
                           style="margin-right: 20px; margin-left: 42px">作品提交时间</label>
                    <el-date-picker
                            v-model="form.competitionTime[i-1].uploadTime"
                            v-show="form.requireUploadFile[i-1]"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                    <el-tooltip effect="light" content="复制阶段持续时间" placement="right">
                        <el-button style="margin-left: 10px" v-show="form.requireUploadFile[i-1]"
                                   size="small"
                                   type="primary"
                                   circle
                                   @click="copyStageTime(i-1)">
                            <i class="el-icon-s-check"></i>
                        </el-button>
                    </el-tooltip>
                </div>
            </el-card>

            <div class="addCard">
                <el-tooltip class="item" effect="light" content="添加阶段" placement="top">
                    <el-button type="text" @click="addDiv" style="font-size: 30px;">
                        <i class="el-icon-circle-plus"></i>
                    </el-button>
                </el-tooltip>

                <el-tooltip class="item" effect="light" content="删除阶段" placement="top">
                    <el-button type="text" @click="deleteDiv" style="font-size: 30px;">
                        <i class="el-icon-remove"></i>
                    </el-button>
                </el-tooltip>
            </div>

            <template v-if="inputBT.length >= 1">
                <label for="" style="margin-right: 20px" >初始阶段</label>
                <el-radio v-for="(item,index) in inputBT" :key="item.id" v-model="stage" :label="index">
                    {{ item }}
                </el-radio>
            </template>


            <div class="div-60"></div>
            <div class="title">介绍信息（提交前请保存）</div>
            <div class="div-30"></div>

            <editor @content="getContent" year="2019"></editor>

            <div class="div-30"></div>
            <div style="text-align: center;">
                <el-button type="primary" @click="createCompetition">发布比赛</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {createCompetition, uploadPicture} from '@/api/adminConsole';
    import editor from '../../components/editor';
    import {getTag} from "@/api/login";

    export default {
        name: "competitionRelease",
        components: {
            'editor':editor,
        },
        data() {
            return {
                dialogVisible: false,
                num: 1, // 卡片的数量
                inputBT:['报名阶段'], //输入框
                stage: '',//初始阶段
                form:{
                    year:'',
                    session:'',
                    allTime:'',
                    competitionTime: [
                        { stageTime:'', uploadTime:''},
                    ],
                    requireUploadFile:[false],
                    information:'',
                    signForm:{
                        maxPeople: '',
                        minPeople: '',
                        requireGroupName: false
                    },
                    tags:[]
                },
                fileList:[],
                file:'', //上传的图片
                tagList:''
            };
        },
        methods: {
            //增加组件
            addDiv() {
                this.num += 1;
                this.inputBT.push('')
                this.form.competitionTime.push({stageTime:'',uploadTime:''});
                this.form.requireUploadFile.push(false);
            },
            //删除组件
            deleteDiv() {
                if(this.num > 1){
                    this.num -= 1;
                    this.inputBT.pop();
                    this.form.competitionTime.pop();
                    this.form.requireUploadFile.pop();
                }
            },
            //创建比赛
            createCompetition() {
                const form = this.form;
                let submitForm = {};
                submitForm.year = parseInt(form.year);
                submitForm.information = form.information;
                submitForm.start = form.allTime[0];
                submitForm.end = form.allTime[1];
                submitForm.stages = [];//阶段信息清空
                const stages = submitForm.stages;

                for(let i=0; i<form.competitionTime.length; i++) {
                    if ( form.requireUploadFile[i] ) {
                        stages.push({
                            name: this.inputBT[i],
                            startDate:form.competitionTime[i].stageTime[0],
                            endDate:form.competitionTime[i].stageTime[1],
                            uploadStartDate: form.competitionTime[i].uploadTime[0],
                            uploadEndDate: form.competitionTime[i].uploadTime[1],
                            requireUploadFile: true
                        })
                    } else {
                        stages.push({
                            name: this.inputBT[i],
                            startDate:form.competitionTime[i].stageTime[0],
                            endDate:form.competitionTime[i].stageTime[1],
                            requireUploadFile: false
                        })
                    }
                }
                submitForm.stage = stages[this.stage];
                form.signForm.minPeople = parseInt(form.signForm.minPeople);
                form.signForm.maxPeople = parseInt(form.signForm.maxPeople);
                submitForm.signForm = form.signForm;
                submitForm.session = form.session;
                // console.log(submitForm.stages)

                const data = new FormData();
                data.append('file', this.file);
                data.append('year', submitForm['year']);
                uploadPicture(data).then( response => {
                    submitForm.mainImage = response.data.data;
                    createCompetition(submitForm).then(response => {
                        this.$message({
                            type:"success",
                            message:response.data.data
                        })
                        sessionStorage.removeItem('competitionList');
                        this.$router.push({
                            name: '/checkCompetition',
                        })
                    }).catch(error => {
                        this.$message.error(error.response.data)
                    })
                })
            },
            //获取editor内容
            getContent(data) {
                this.form.information = data;
            },
            //文件状态改变时的钩子
            fileChange(file) {
                this.file = file.raw;
            },
            //删除文件
            handleRemove() {
                this.file = '';
            },
            //复制阶段持续时间
            copyStageTime(index) {
                const stageTime = this.form.competitionTime[index].stageTime;
                if (stageTime === '') {
                    return false;
                }
                const start = stageTime[0];
                const end = stageTime[1];
                const data = {
                    stageTime: [start, end],
                    uploadTime: [start, end]
                }
                this.form.competitionTime.splice(index, 1, data)
            },
            //获取所有的tag
            getTags() {
                getTag().then( response => {
                    this.tagList = response.data.data;
                }).catch( error => {
                    this.$message.error(error.response.data)
                })
            }
        },
        mounted() {
            window.scrollTo(0,0);
            this.getTags()
        }
    }
</script>

<style lang="scss" scoped>
    .competitionRelease {
        background-color: #FFFFFF;
        margin: 0 auto;
        padding: 50px;

        .formDesign {
            margin: 0 auto;

            .peopleLimited {
                width: 7em;
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

        /deep/.el-input.is-disabled .el-input__inner {
            cursor: auto;
            color: #606266;
        }

    }

</style>
