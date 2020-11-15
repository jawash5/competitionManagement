<template>
    <div>
        <el-dialog :visible.sync="visible"
                   title="发送通知"
                   width="1000px"
                   center
                   :show-close="false"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   @open="getChosenGroup">
            <div class="title">主题</div>
            <el-input v-model="subject"></el-input>

            <div class="div-30"></div>
            <div class="title">{{tip}}</div>
            <editor @content="getContent" :clear="clear"></editor>

            <div class="div-30"></div>
            <div class="title">预览区</div>
            <el-tabs tab-position="top" @tab-click="chosenTap">
                <el-tab-pane v-for="(item,index) in chosenGroups"
                             :key="index"
                             :label="item.captainName"
                             :lazy="true">
                    <div class="markdown-body" v-html="myContent"></div>
                </el-tab-pane>
            </el-tabs>

            <div class="div-30"></div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogClose()">取 消</el-button>
                <el-button type="primary" @click="conform">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import editor from "@/components/editor"
    import { mavonEditor } from 'mavon-editor';
    import 'mavon-editor/dist/css/index.css';
    import {sendNotice} from '@/api/adminConsole'

    export default {
        name: "sendMessage",
        components:{editor},
        data() {
            return {
                subject:'',
                tip:'通知内容（可用属性 {{队长姓名}}）',
                content:'',//输入的内容
                chosenGroups:[],//选择的小组
                groupsContent:'',//内容替换后的数据
                clear:false,//编辑器清空
                submitInfo:{
                    subject: "",
                    format: {},
                    groups: [],
                },
            }
        },
        props:{
            visible:{
                type:Boolean,
                require:true,
                default:false,
            },
        },
        computed:{
            myContent() {
                let markdownIt = mavonEditor.getMarkdownIt()
                return markdownIt.render(this.groupsContent)
            }
        },
        methods:{
            getContent(data) {
                this.content = data;
                let content = this.content;
                this.groupsContent = content.replace(new RegExp("{{队长姓名}}","gm"), this.chosenGroups[0].captainName)

            },
            dialogClose() {
                this.$emit("update:visible",false);
                this.clear = false;
            },
            //打开对话框后的事件
            getChosenGroup() {
                this.subject = '';
                this.clear = true;
                this.chosenGroups = this.$store.getters['sendNotice/chosenGroups'];
            },
            chosenTap(data) {
                const index = data.index;
                let content = this.content;
                this.groupsContent = content.replace(new RegExp("{{队长姓名}}","gm"), this.chosenGroups[index].captainName)

            },
            conform() {
                if(this.subject === '') {
                    this.$message.error('通知主题不同为空！');
                    return false;
                }

                this.submitInfo.subject = this.subject;
                this.submitInfo.groups = [];

                //统一修改format信息
                const content = this.content;
                let format = '';
                for(const group of this.chosenGroups) {
                    format = content.replace(new RegExp("{{队长姓名}}","gm"), group.captainName);
                    this.submitInfo.groups.push(group.id);
                    this.submitInfo.format[group.id] = format || content;
                    format = '';
                }

                console.log(this.submitInfo);
                sendNotice(this.submitInfo).then(() => {
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
    }

    .markdown-body {
        padding: 0 50px;
    }
</style>