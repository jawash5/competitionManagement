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
        </el-dialog >

        <el-dialog :visible.sync="noticeStatus"
                   title="发送进度"
                   width="500px"
                   center
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   @open="getProcess">
            <el-table
                    :data="tableData"
                    stripe
                    max-height="60vh"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="发送状态">
                </el-table-column>
            </el-table>

        </el-dialog>
    </div>
</template>

<script>
    import {checkMailStatus, sendNotice} from '@/api/adminConsole'

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
                showGroupIndex:'',//单选下拉框
                noticeStatus: false,
                tableData:[],
                mailMap:''
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
                this.showGroupIndex = '';
                this.form.subject = '';
                this.form.content = '';
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
            //发送通知
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
                sendNotice(submitInfo).then( response => {
                    this.mailMap = response.data.data;
                    this.noticeStatus = true;
                }).catch(error => {
                    this.$message.error(error.response.data)
                }).finally( () => {
                    this.dialogClose();
                });
            },
            //获取进度
            getProcess() {
                const chosenGroup = this.chosenGroups;
                const map = this.mailMap;
                let tableData = this.tableData;
                for (let i=0; i<chosenGroup.length; i++) {
                    tableData.push({
                        'name': chosenGroup[i].captainName,
                        'status': '等待发送',
                        'groupId': chosenGroup[i].id
                    })
                    checkMailStatus(map[chosenGroup[i].id]).then( response => {
                        const res = response.data.data
                        if ( res === 'success') {
                            tableData.splice(i, 1, {
                                'name': chosenGroup[i].captainName,
                                'status': '发送成功',
                                'groupId': chosenGroup[i].id
                            })
                        } else if (res === '发送中') {
                            tableData.splice(i, 1, {
                                'name': chosenGroup[i].captainName,
                                'status': '发送中',
                                'groupId': chosenGroup[i].id
                            })
                            const key = setInterval( () => {
                                checkMailStatus(map[chosenGroup[i].id]).then( response => {
                                    if (response.data.data === 'success') {
                                        tableData.splice(i, 1, {
                                            'name': chosenGroup[i].captainName,
                                            'status': '发送成功',
                                            'groupId': chosenGroup[i].id
                                        })
                                        clearInterval(key);
                                    }
                                })
                            }, 1000)

                        }
                    }).catch( error => {
                        console.log(error.config)
                    })
                }
            },
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