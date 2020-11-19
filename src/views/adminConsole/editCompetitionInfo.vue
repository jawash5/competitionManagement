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
                            @change="look"
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


        <div class="div-60"></div>
        <div class="title">介绍信息<span v-show="isEdit.descInfo">（提交前请保存）</span>
            <el-button class="pull-right"
                       type="danger"
                       v-show="!isEdit.descInfo"
                       @click="isEdit.descInfo = true">修改信息</el-button>
            <el-button class="pull-right"
                       type="danger"
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
    import {editBasicInfo, editDescInfo} from "@/api/adminConsole";
    import {mavonEditor} from 'mavon-editor';
    import 'mavon-editor/dist/css/index.css';


    export default {
        name: "editCompetitionList",
        components: {
            'editor':editor,
        },
        data() {
            return {
                form:{
                    year:'',
                    session:'',
                    allTime: [],
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
                fileList:[],
                file:'', //上传的图片
                num: 1, // 卡片的数量
                inputBT:['报名阶段'], //输入框
                stage: '',//阶段
                isEdit:{
                    basicInfo: false,
                    descInfo: false
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
                console.log(11)

            },
            deleteDiv() {
                console.log(11)

            },
            //获取editor内容
            getContent(data) {
                this.form.information = data;
            },

            look(data) {
                console.log(data)
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