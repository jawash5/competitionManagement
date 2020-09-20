<template>
    <div id="competitionRelease">
        <div id="formDesign">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="比赛年">
                    <el-input placeholder="请输入比赛年" style="width: 150px" v-model="form.year" maxlength="4"></el-input>
                </el-form-item>

                <el-form-item label="报名时间">
                    <el-date-picker
                            v-model="form.signUptime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
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
                    <el-row>
                        <el-col :span="3">
                            <el-input v-model="form.signForm.minPeople" maxlength="2" placeholder="最少人数"></el-input>
                        </el-col>
                        <el-col :span="1">
                            <span style="margin:0 0 0 .6rem">至</span>
                        </el-col>
                        <el-col :span="3">
                            <el-input v-model="form.signForm.maxPeople" maxlength="2" placeholder="最大人数"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="比赛简介">
                    <el-input type="textarea" v-model="form.information" :rows="2"></el-input>
                </el-form-item>


            </el-form>

            <el-card class="formCard" v-for="i in num" :key="i">
                <div class="pull-center">
                    <el-tag>{{i}}</el-tag>
                    <el-input
                            placeholder="请输入赛事阶段名称"
                            v-model="inputBT[i-1]"
                            clearable
                            style="width: 50%; margin-left: 30px">
                    </el-input>
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
                <el-tooltip class="item" effect="light" content="添加新组件" placement="top">
                    <el-button type="text" @click="addDiv" style="font-size: 30px;">
                        <i class="el-icon-circle-plus"></i>
                    </el-button>
                </el-tooltip>

                <el-tooltip class="item" effect="light" content="删除组件" placement="top">
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
            <div class="div-30"></div>
            <div style="text-align: center;">
                <el-button type="primary" @click="createCompetition">发布比赛</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {creatCompetition} from '@/api/adminConsole'
    export default {
        name: "competitionRelease",
        components: {
        },
        data() {
            return {
                dialogVisible: false,
                num: 1, // 卡片的数量
                inputBT:[], //输入框
                stage: '',//阶段
                form:{
                    year:'',
                    allTime:'',
                    signUptime:'',
                    competitionTime: [
                        {name:'', stageTime:'', uploadTime:''}
                    ],
                    information:'',
                    signForm:{
                        maxPeople: '',
                        minPeople: '',
                    }
                },
                //提交的表单
                submitForm:{},

            };
        },
        methods: {
            //增加组件
            addDiv() {
                this.num += 1;
                this.inputBT.push('')
                this.form.competitionTime.push({name:'', stageTime:'',uploadTime:''});
            },
            //删除组件
            deleteDiv() {
                if(this.num > 1){
                    this.num -= 1;
                    this.inputBT.pop()
                    this.form.competitionTime.pop();
                }
            },
            //创建比赛
            createCompetition() {
                // console.log(this.form)
                const form = this.form;
                this.submitForm.year = parseInt(form.year);
                this.submitForm.information = form.information;
                this.submitForm.stages = [];
                this.submitForm.start = form.allTime[0];
                this.submitForm.end = form.allTime[1];
                const stages = this.submitForm.stages;
                for(let i=0; i<form.competitionTime.length; i++) {
                    stages.push({
                        name: this.inputBT[i],
                        startDate:form.competitionTime[i].stageTime[0],
                        endDate:form.competitionTime[i].stageTime[1],
                        uploadStartDate: form.competitionTime[i].uploadTime[0],
                        uploadEndDate: form.competitionTime[i].uploadTime[1]
                    })
                }
                stages.push({
                    name:'报名时间',
                    startDate: form.signUptime[0],
                    endDate:form.signUptime[1],
                    uploadStartDate: '',
                    uploadEndDate: '',
                })
                this.submitForm.state = stages[this.stage];
                form.signForm.minPeople = parseInt(form.signForm.minPeople);
                form.signForm.maxPeople = parseInt(form.signForm.maxPeople);
                this.submitForm.signForm = form.signForm;
                console.log(this.submitForm)
                creatCompetition(this.submitForm).then(response => {
                    this.$message({
                        type:"success",
                        message:response.data.data
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #competitionRelease {
        background-color: #FFFFFF;
        margin: 0 auto;
        padding: 50px;

        #mainInfo {
            margin: 0 auto;
            width: 600px;
        }

        .fontTitle {
            font-size: 20px;
            font-weight: bold;
            font-family: "幼圆" , serif;
            line-height: 40px;
        }

        #mainInfo /deep/.el-input__inner {
            font-size: 16px;
        }

        #formDesign {
            width: 900px;
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

    }


</style>