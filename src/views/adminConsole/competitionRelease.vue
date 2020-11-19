<template>
    <div id="competitionRelease">
        <div id="formDesign" class="dif">
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

            <div class="dif">
                <el-card class="formCard">
                    <div class="pull-center">
                        <el-tag>{{1}}</el-tag>
                        <el-input
                                v-model="inputBT[0]"
                                disabled
                                style="width: 50%; margin-left: 30px">
                        </el-input>

                        <label for="" style="margin-right: 10px;margin-left: 100px">上传文件</label>
                        <el-switch v-model="form.requireUploadFile[0]"></el-switch>
                    </div>
                    <el-divider></el-divider>
                    <div class="pull-center">
                        <label for="" style="margin-right: 20px">阶段持续时间</label>
                        <el-date-picker
                                v-model="form.signUptime"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </div>
                </el-card>

                <el-card class="formCard" v-for="i in num" :key="i">
                    <div class="pull-center">
                        <el-tag>{{i+1}}</el-tag>
                        <el-input
                                placeholder="请输入赛事阶段名称"
                                v-model="inputBT[i]"
                                clearable
                                style="width: 50%; margin-left: 30px">
                        </el-input>

                        <label for="" style="margin-right: 10px;margin-left: 100px">上传文件</label>
                        <el-switch v-model="form.requireUploadFile[i]"></el-switch>
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
                        <label for="" style="margin-right: 20px">作品提交时间</label>
                        <el-date-picker
                                v-model="form.competitionTime[i-1].uploadTime"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
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
            </div>

            <div class="div-60"></div>
            <div class="title">介绍信息（提交前请保存）</div>
            <div class="div-30"></div>

            <editor @content="getContent" year="2019" class="dif3"></editor>

            <div class="div-30"></div>
            <div style="text-align: center;">
                <el-button type="primary" @click="createCompetition">发布比赛</el-button>
            </div>
        </div>
        <span class="mobileShow">请在PC端查看并操作</span>
    </div>
</template>

<script>
    import {createCompetition,uploadPicture} from '@/api/adminConsole';
    import editor from '../../components/editor';

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
                stage: '',//阶段
                form:{
                    year:'',
                    session:'',
                    allTime:'',
                    signUptime:'',
                    competitionTime: [
                        {name:'', stageTime:'', uploadTime:''}
                    ],
                    requireUploadFile:[true,false],
                    information:'',
                    signForm:{
                        maxPeople: '',
                        minPeople: '',
                        requireGroupName: false
                    }
                },
                //提交的表单
                submitForm:{},
                fileList:[],
                file:'', //上传的图片
                dif: 'dif1',//类名toggle,
            };
        },
        methods: {
            //增加组件
            addDiv() {
                this.num += 1;
                this.inputBT.push('')
                this.form.competitionTime.push({name:'', stageTime:'',uploadTime:''});
                this.form.requireUploadFile.push(false);
            },
            //删除组件
            deleteDiv() {
                if(this.num > 0){
                    this.num -= 1;
                    this.inputBT.pop();
                    this.form.competitionTime.pop();
                    this.form.requireUploadFile.pop();
                }
            },
            //创建比赛
            createCompetition() {
                // console.log(this.form)
                const form = this.form;
                this.submitForm.year = parseInt(form.year);
                this.submitForm.information = form.information;
                this.submitForm.start = form.allTime[0];
                this.submitForm.end = form.allTime[1];
                this.submitForm.stages = [];//阶段信息清空
                const stages = this.submitForm.stages;
                stages.push({
                    name:'报名阶段',
                    startDate: form.signUptime[0],
                    endDate:form.signUptime[1],
                    uploadStartDate: '2019-01-01 00:00:00',
                    uploadEndDate: '2019-01-01 00:00:00',
                    requireUploadFile: form.requireUploadFile[0]
                });
                for(let i=0; i<form.competitionTime.length; i++) {
                    stages.push({
                        name: this.inputBT[i+1],
                        startDate:form.competitionTime[i].stageTime[0],
                        endDate:form.competitionTime[i].stageTime[1],
                        uploadStartDate: form.competitionTime[i].uploadTime[0],
                        uploadEndDate: form.competitionTime[i].uploadTime[1],
                        requireUploadFile: form.requireUploadFile[i+1]
                    })
                }
                this.submitForm.stage = stages[this.stage];
                form.signForm.minPeople = parseInt(form.signForm.minPeople);
                form.signForm.maxPeople = parseInt(form.signForm.maxPeople);
                this.submitForm.signForm = form.signForm;
                this.submitForm.session = this.form.session;

                const data = new FormData();
                data.append('file', this.file);
                data.append('year', this.submitForm.year);
                uploadPicture(data).then( response => {
                    this.submitForm.mainImage = response.data.data
                    createCompetition(this.submitForm).then(response => {
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

            // //图片上传超出限制
            // handleExceed() {
            //     // this.$message.error('至多上传一个文件！')
            //     console.log(111)
            // },
            //文件状态改变时的钩子
            fileChange(file) {
                this.file = file.raw;
            },

            //删除文件
            handleRemove() {
                this.file = '';
            },
        },
        mounted() {
            window.scrollTo(0,0);
        }
    }
</script>

<style lang="scss" scoped>
    #competitionRelease {
        background-color: #FFFFFF;
        margin: 0 auto;
        padding: 50px;

        #formDesign {
            margin: 0 auto;

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

        /deep/.el-input.is-disabled .el-input__inner {
            cursor: auto;
            color: #606266;
        }

    }

    @media screen and (max-width: 420px){

        /deep/ .dif{
            display: none;
        }

        /deep/.v-note-wrapper.markdown-body.shadow{

        }

    }

    @media screen and (min-width: 421px){

        .mobileShow{
            display: none;
        }

    }


</style>
