<template>
    <div>
        <el-dialog :visible="visible"
                   title="发送通知"
                   width="1000px"
                   center
                   :show-close="false"
                   @open="getChosenGroup">
            <div class="title">主题</div>
            <el-input v-model="subject"></el-input>

            <div class="div-30"></div>
            <div class="title">{{tip}}</div>
            <editor @content="getContent"></editor>


            <el-tabs tab-position="top" @tab-click="chosenTap">
                <el-tab-pane v-for="item in chosenGroups"
                             :key="item.id"
                             :label="item.captain.name"
                             :lazy="true">
                    <div class="markdown-body">
                        <vue-markdown :source="groupsContent"></vue-markdown>
                    </div>
                </el-tab-pane>
            </el-tabs>


            <div class="div-30"></div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogClose">取 消</el-button>
                <el-button type="primary" @click="conform">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import editor from "@/components/editor"
    import VueMarkdown from 'vue-markdown'
    import {sendNotice} from '@/api/adminConsole'

    export default {
        name: "sendMessage",
        components:{editor, VueMarkdown},
        data() {
            return {
                subject:'',
                tip:'通知内容（可用属性 {{队长姓名}}）',
                content:'',//输入的内容
                chosenGroups:[],//选择的小组
                groupsContent:'',//内容替换后的数据
                submitInfo:{
                    subject: "",
                    format: {},
                    groups: [],
                    content: ""
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
        methods:{
            getContent(data) {
                this.content = data;
                this.groupsContent = this.content.replace('{{队长姓名}}', this.chosenGroups[0].captainName.name)
            },
            dialogClose() {
                this.$emit("dialogClose");
            },
            //打开对话框后的事件
            getChosenGroup() {
                this.subject = '';
                this.content = '';
                this.chosenGroups = this.$store.getters['sendNotice/chosenGroups'];
                // console.log(this.chosenGroups);
            },
            chosenTap(data) {
                const index = data.index;
                this.groupsContent = this.content.replace('{{队长姓名}}', this.chosenGroups[index].captainName.name)
            },
            conform() {
                if(this.subject === '') {
                    this.$message.error('通知主题不同为空！');
                    return false;
                }

                this.submitInfo.content = this.groupsContent;
                this.submitInfo.subject = this.subject;
                for(let i=0; i<this.chosenGroups.length; i++) {
                    this.submitInfo.groups.push(this.chosenGroups[i].id)
                }
                // console.log(this.submitInfo);
                sendNotice(this.submitInfo).then(() => {
                    this.$message({
                        type:"success",
                        message:"发送成功！"
                    })
                }).catch(error => {
                    this.$message.error(error.response.data)
                });
                this.dialogClose();
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
        width: 70%;
    }
</style>