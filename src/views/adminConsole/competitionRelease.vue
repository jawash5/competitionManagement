<template>
    <div id="competitionRelease">
        <div id="mainInfo">
            <el-row :gutter="10">
                <el-col :span="2">
                    <p class="fontTitle pull-right">第</p>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="form.session" maxlength="3" placeholder="届数"></el-input>
                </el-col>
                <el-col :span="2">
                    <p class="fontTitle">届</p>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="form.competitionName" placeholder="请输入比赛名称"></el-input>
                </el-col>
            </el-row>
        </div>
        <el-divider></el-divider>
        <div class="div-30"></div>

        <div id="formDesign">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="报名时间">
                    <el-date-picker
                            v-model="form.signUptime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="作品提交时间">
                    <el-date-picker
                            v-model="form.competitionTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="比赛简介">
                    <el-input type="textarea" v-model="form.desc" :rows="2"></el-input>
                </el-form-item>

                <el-form-item label="比赛要求">
                    <el-input type="textarea" v-model="form.request" :rows="2"></el-input>
                </el-form-item>

<!--                <el-form-item>-->
<!--                    <el-button type="primary" @click="onSubmit">立即创建</el-button>-->
<!--                    <el-button>取消</el-button>-->
<!--                </el-form-item>-->
            </el-form>

            <el-card class="formCard"  v-for="i in num" :key="i">
                <el-tag >{{i}}</el-tag>
                <el-input
                        placeholder="请输入标题内容"
                        v-model="inputBT[i-1]"
                        clearable
                        style="width: 70%; margin-left: 30px">
                </el-input>
                <el-select
                        v-model="value[i-1]"
                        placeholder="请选择"
                        style="width: 18%; float:right;">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-divider></el-divider>
                <div v-if="value[i-1]==='input'" style="color:#c0c4cc;">
                    待填写者写入文本
                </div>
                <div v-if="value[i-1]==='InputNumber'" style="color:#c0c4cc;">
                    待填写者写入数字
                </div>

                <div class="radio"
                     v-if="value[i-1]==='radio'"
                     style="color: #c0c4cc;margin-top: 20px;">
                    <div v-for="j in radio[i-1].num" :key="j">
                        ○
                        <el-input
                                placeholder="请输入选项名"
                                v-model = "radio[i-1].data[j-1]"
                                clearable
                                style="width: 80%;">
                        </el-input>
                    </div>
                    <div>
                        <el-button type="text" @click="addRadio(i)">
                            <i class="el-icon-circle-plus-outline"
                               style="font-size: 20px;margin-top: 10px">
                            </i>
                        </el-button>
                        <el-button type="text" @click="deleteRadio(i)">
                            <i class="el-icon-remove-outline"
                               style="font-size: 20px;margin-top: 10px">
                            </i>
                        </el-button>
                    </div>
                </div>

                <div class="radio"
                     v-if="value[i-1]==='checkbox'"
                     style="color: #c0c4cc;margin-top: 20px;">
                        <div v-for="j in checkbox[i-1].num" :key="j">
                            □
                            <el-input
                                    placeholder="请输入选项名"
                                    v-model="checkbox[i-1].data[j-1]"
                                    clearable
                                    style="width: 80%;">
                            </el-input>
                        </div>
                    <div>
                        <el-button type="text"
                                   @click="addCheckbox(i)">
                            <i class="el-icon-circle-plus-outline"
                               style="font-size: 20px;margin-top: 10px">
                            </i>
                        </el-button>
                        <el-button type="text" @click="deleteCheckbox(i)">
                            <i class="el-icon-remove-outline" style="font-size: 20px;margin-top: 10px">
                            </i>
                        </el-button>
                    </div>
                </div>

                <div class="radio"
                     v-if="value[i-1]==='select'"
                     style="color: #c0c4cc;margin-top: 20px;">
                    <div v-for="j in select[i-1].num" :key="j">
                        {{ j }}
                        <el-input
                                placeholder="请输入选项名"
                                v-model="select[i-1].data[j-1]"
                                clearable
                                style="width: 80%;">
                        </el-input>
                    </div>
                    <div>
                        <el-button type="text" @click="addSelect(i)">
                            <i class="el-icon-circle-plus-outline"
                               style="font-size: 20px;margin-top: 10px">
                            </i>
                        </el-button>
                        <el-button type="text" @click="deleteSelect(i)">
                            <i class="el-icon-remove-outline"
                               style="font-size: 20px;margin-top: 10px">
                            </i>
                        </el-button>
                    </div>
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
        </div>
    </div>
</template>

<script>
    export default {
        name: "competitionRelease",
        components: {
        },
        data() {
            return {
                num:1, // 卡片的数量
                inputBT:[], //输入框
                //下拉选择框
                options: [{
                    value: 'input',
                    label: '文本'
                }, {
                    value: 'InputNumber',
                    label: '数字'
                }, {
                    value: 'radio',
                    label: '单选按钮'
                }, {
                    value: 'checkbox',
                    label: '多选按钮'
                }, {
                    value: 'select',
                    label: '下拉选择'
                }],
                value: [], //选项栏
                //单选框
                radio: [
                    {
                        num: 2,
                        data: []
                    }
                ],

                //多选按钮
                checkbox: [
                    {
                        num: 2,
                        data: []
                    }
                ],

                //下拉框
                select: [
                    {
                        num: 2,
                        data: []
                    }
                ],
                form:{
                    session:'',
                    competitionName:'',
                    signUptime:'',
                    competitionTime:'',
                    desc:'',
                    request:''
                }

            };
        },
        methods: {
            addRadio:function(cardNo) {
                this.radio[cardNo-1].num += 1;
            },
            deleteRadio: function(cardNo) {
                this.radio[cardNo-1].num -= 1;
            },
            addCheckbox: function(cardNo) {
                this.checkbox[cardNo-1].num += 1;
            },
            deleteCheckbox: function(cardNo) {
                this.checkbox[cardNo-1].num -= 1;
            },
            addSelect: function(cardNo) {
                this.select[cardNo-1].num += 1;
            },
            deleteSelect: function(cardNo) {
                this.select[cardNo-1].num -= 1;
            },
            //增加组件
            addDiv() {
                this.num += 1;
                this.inputBT.push()
                this.radio.push({num:2, data:[]});
                this.checkbox.push({num:2, data:[]});
                this.select.push({num:2, data:[]});


            },
            //删除组件
            deleteDiv() {
                if(this.num > 1){
                    this.num -= 1;
                    this.inputBT.pop()
                    this.radio.pop();
                    this.checkbox.pop()
                    this.select.pop();
                }

            },
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