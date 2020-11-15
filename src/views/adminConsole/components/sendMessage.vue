<template>
    <div>
        <el-dialog :visible.sync="visible"
                   title="发送通知"
                   width="900px"
                   center
                   :show-close="false"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   @open="getChosenGroup">
            <el-row :gutter="20">
                <el-col :span="11">
                    <div class="title">主题</div>
                    <el-input v-model="form.subject"></el-input>
                    <div class="div-30"></div>

                    <div class="title">{{tip}}
                        <span class="addInfo" @click="addLeaderName">队长姓名</span>）
                    </div>
                    <el-input type="textarea" v-model="form.content" :autosize="{ minRows: 5}"></el-input>
                    <div class="div-30"></div>
                </el-col>
                <div class="divider"></div>
                <el-col :span="11" :offset="2">
                    <div class="title pull-center">预览区
                        <el-select v-model="showGroupIndex"
                                   class="pull-right"
                                   size="small"
                                   placeholder="请选择预览小组">
                            <el-option
                                    v-for="(item,index) in chosenGroups"
                                    :key="index"
                                    :label="item.captainName"
                                    :value="index">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="preview">
                        {{ groupsContent }}
                    </div>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogClose">取 消</el-button>
                <el-button type="primary" @click="conform">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {sendNotice} from '@/api/adminConsole'

    export default {
        name: "sendMessage",
        props:{
            visible:{
                type:Boolean,
                require:true,
                default:false,
            },
        },
        data() {
            return {
                form:{
                    subject:'',
                    content:'',//输入的内容
                },
                tip:'通知内容（可用属性',
                chosenGroups:[],//选择的小组
                showGroupIndex:'',

            }
        },
        computed:{
            //内容替换后的数据
            groupsContent() {
                let name;
                if (this.showGroupIndex === '') {
                    name = '小明'
                } else {
                    name = this.chosenGroups[this.showGroupIndex].captainName
                }
                return this.form.content.replace(new RegExp("{{队长姓名}}","gm"), name)
            }
        },
        methods:{
            dialogClose() {
                this.$emit("update:visible",false);
            },
            //打开对话框后的事件
            getChosenGroup() {
                this.form.subject = '';
                this.form.content = '';
                this.chosenGroups = this.$store.getters['sendNotice/chosenGroups'];
            },
            addLeaderName() {
                this.form.content += '{{队长姓名}}';
            },

            conform() {
                if(this.form.subject === '') {
                    this.$message.error('通知主题不同为空！');
                    return false;
                }
                const submitInfo = {
                    subject: '',
                    format: {},
                    groups: [],
                }
                submitInfo.subject = this.form.subject;

                //统一修改format信息
                const content = this.form.content;
                let format = '';
                for(const group of this.chosenGroups) {
                    format = content.replace(new RegExp("{{队长姓名}}","gm"), group.captainName);
                    submitInfo.groups.push(group.id);
                    submitInfo.format[group.id] = format;
                    format = '';
                }
                sendNotice(submitInfo).then(() => {
                    this.$message({
                        type:"success",
                        message:"发送成功！"
                    })
                }).catch(error => {
                    this.$message.error(error.response.data)
                }).finally( () => {
                    this.dialogClose();
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    .title {
        font-size: 16px;
        margin-bottom: 15px;
        line-height: 32px;
    }

    .preview {
        margin: 0 20px;
        white-space: pre-wrap;
        line-height: 150%;
    }

    .addInfo {
        cursor: pointer;

        &:hover {
            color: #409EFF;
            text-decoration: underline;
        }
    }

    .divider {
        position: absolute;
        right:434px;
        top:20px;
        border-left:1px solid #DCDFE6;
        height:80%;
    }
</style>