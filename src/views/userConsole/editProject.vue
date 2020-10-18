<template>
        <div id="editProject">
            <el-page-header @back="goBack" class="pull-left"></el-page-header>
            <h1 id="competitionName">查看资料</h1>
            <el-row>
                <el-col :span="12" :offset="2">
                    <div id="projectForm">
                        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="比赛名称" prop="type">
                                <el-input v-model="groupInfo.competitionName"
                                          class="pull-left"
                                          :disabled="true">
                                </el-input>
                            </el-form-item>

                            <el-divider></el-divider>

                            <el-form-item label="队伍名称" prop="teamName">
                                <el-input v-model="groupInfo.name" :disabled="true"></el-input>
                            </el-form-item>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="队长姓名"  prop="leader">
                                        <el-input v-model="groupInfo.captainName" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-form-item label="联系手机" prop="telephoneNumber">
                                <el-input v-model="groupInfo.teammates[0].phoneNo" :disabled="true"></el-input>
                            </el-form-item>

                            <el-form-item label="邮箱地址" prop="mail">
                                <el-input v-model="groupInfo.teammates[0].email" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="项目成员" prop="members">
                                <template v-if="groupInfo.teammates.length !== 1">
                                    <div class="teammates">
                                        <template v-for="(item,index) in groupInfo.teammates.slice(1)">
                                            <el-row :gutter="20" :key="index">
                                                <el-col :span="12">
                                                    <label for="">姓名</label>
                                                    <el-input class="labelFor"
                                                              v-model="item.name"
                                                              placeholder="请输入姓名"
                                                              size="small"
                                                              :disabled="true"></el-input>
                                                </el-col>
                                                <el-col :span="12">
                                                    <label for="">学号</label>
                                                    <el-input class="labelFor"
                                                              v-model="item.studentNo"
                                                              placeholder="请输入学号"
                                                              size="small"
                                                              :disabled="true"></el-input>
                                                </el-col>
                                            </el-row>
                                            <div :key="index + 'btn'" class="buttons" v-if="isLeader">
                                                    <el-button size="mini"
                                                               type="primary"
                                                               @click="appointCaptain(groupInfo.teammates[index+1].id)">任命队长</el-button>

                                                    <el-button size="mini"
                                                               type="danger"
                                                               @click="deleteTeammate(groupInfo.teammates[index+1].id)">删除组员</el-button>
                                            </div>
                                            <el-divider :key="index + 'divider'"></el-divider>

                                        </template>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="noTeammate">无其他项目成员</div>
                                </template>
                                <div v-if="isLeader">
                                    <el-button type="primary" size="small" @click="inviteVisible = true">邀请队友</el-button>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="6" :offset="2">
                    <div class="fileTabs">
                        <div style="color: #606266">比赛状态
                            <div class="statusPoint" style="background-color: lightgreen"></div>成功
                            <div class="statusPoint" style="background-color: #409EFF"></div>文件未提交
                            <div class="statusPoint" style="background-color: red"></div>淘汰
                        </div>
                        <div class="div-30"></div>
                        <el-timeline>
                            <el-timeline-item v-for="(item,index) in stageInfo"
                                              :key="item.name"
                                              :timestamp="item.name"
                                              :color="item.color"
                                              placement="top">
                                <el-card>
                                    <div class="stageTip">阶段持续时间：{{item.start}} 至 {{item.end}}</div>
                                    <div class="div-15"></div>
                                    <div class="stageTip" v-if="item.uploadStart !== undefined">文件提交时间：{{item.uploadStart}} 至 {{item.uploadEnd}}</div>
                                    <div class="div-15"></div>
                                    <div class="pull-center">
                                        <el-button v-if="stepActive === index && isLeader"
                                                   type="primary"
                                                   size="mini"
                                                   @click="uploadDialog = true">上传文件</el-button>
                                    </div>
                                    <el-upload
                                            style="margin-top: -10px"
                                            action="#"
                                            :disabled="stepActive !== index"
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemove"
                                            :before-remove="beforeRemove"
                                            :file-list="stageInfo[index].file">
                                    </el-upload>
                                </el-card>
                            </el-timeline-item>

                        </el-timeline>

                    </div>

                </el-col>
            </el-row>

            <invite :visible="inviteVisible"
                    :dialogClose.sync="inviteVisible"
                    :group-id="groupInfo.id + ''"></invite>

            <upload :visible="uploadDialog"
                    :dialogClose.sync="uploadDialog"
                    :competition-id="groupInfo.competitionId"
                    :stage-id="stages[stepActive].id"
                    :group-id="groupInfo.id"
                    @success="getStages(groupInfo.competitionId)"></upload>
        </div>
</template>

<script>
    import {
        getGroupInfo,
        personalInfo,
        appointCaptain,
        deleteTeammate,
        stageFile,
        userDownloadFile,
        userDeleteFile
    } from "@/api/userConsole";
    import invite from "@/views/userConsole/components/invite";
    import {competitionDetail} from "@/api/login";
    import sortValue from "@/utils/sort";
    import upload from "@/views/userConsole/components/upload";
    import format from "@/utils/timeFormat";

    export default {
        name: "editProject" ,
        components:{invite,upload},
        data() {
            return{
                inviteVisible:false,//邀请对话框
                inputValue: '',
                fileList: [],
                ruleForm: {
                    name: '',
                    teamName:'',
                    leader:'',
                    telephoneNumber:'',
                    mail: '',
                    members: [
                        { name:'', no:'' }
                    ],
                },
                //创建的队伍信息
                groupInfo: {
                    id: '',
                    name: '',
                    competitionId: '',
                    captainId: '',
                    teammates: [
                        {
                            id: '',
                            name: "",
                            studentNo: '',
                            university: "",
                            school: "",
                            phoneNo: "",
                            email: ""
                        }
                    ]
                },
                stageActiveName:'',//阶段文件选择值
                stageInfo:[],
                isLeader:false,
                captainId: '',
                uploadDialog: false,
                stepActive:0,//当前所处阶段值
                stages:[
                    {
                        endDate: "",
                        id: "",
                        name: "",
                        requireUploadFile: "",
                        startDate: "",
                        uploadEndDate: "",
                        uploadStartDate: ""}
                ],
            }
        },
        methods: {
            //页头返回
            goBack() {
                this.$router.push('/myProject')
            },
            //获取队伍信息
            getGroupInfo() {
                const groupId = this.$store.getters['group/groupId'];
                getGroupInfo(groupId).then(response => {
                    let groupInfo = response.data.data;
                    for(let i=0, teammates = groupInfo.teammates; i<teammates.length; i++) {
                        if(teammates[i].id === groupInfo.captainId) {
                            const captain = groupInfo.teammates.splice(i,1)[0];
                            groupInfo.teammates.unshift(captain);
                        }
                    }
                    this.groupInfo = groupInfo;
                    this.getPersonalAuthority();
                    this.getStages(this.groupInfo.competitionId);
                });
            },
            //获取角色修改权限信息
            getPersonalAuthority() {
                personalInfo().then( response => {
                    this.captainId = response.data.data.id;
                    this.isLeader = (this.captainId === this.groupInfo.captainId);
                })
            },
            //任命队长
            appointCaptain(teammateId) {
                this.$confirm('任命后不可取消, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const data = new FormData;
                    data.append('groupId', this.groupInfo.id);
                    data.append('captainId', teammateId);
                    appointCaptain(data).then( () => {
                        this.$message.success('任命成功！');
                        this.getGroupInfo();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消！'
                    });
                });
            },
            //删除组员
            deleteTeammate(teammateId) {
                this.$confirm('此操作将永久删除该成员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const data = new FormData;
                    data.append('groupId', this.groupInfo.id);
                    data.append('teammateId', teammateId);
                    deleteTeammate(data).then(() => {
                        this.$message.success('删除成功！');
                        this.getGroupInfo();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //获取比赛阶段
            getStages(competitionId) {
                    competitionDetail(competitionId).then( async response => {
                        let stages = response.data.data.stages;
                        sortValue(stages, 'id');
                        this.stages = stages;
                        this.stageInfo = [];
                        await this.pushStageInfo(stages);
                        this.getNowStage();//获取当前阶段
                        this.getStageStatus();//获取各阶段状态
                    })
            },
            //异步转线式
            async pushStageInfo(stages) {
                for (const stage of stages) {
                    await this.getStageFile(this.groupInfo.id, stage.id).then( response => {
                        if(response !== undefined) {
                            this.stageInfo.push(
                                {
                                    name:stage.name ,
                                    value:stage.id,
                                    start:stage.startDate,
                                    end:stage.endDate,
                                    uploadStart:stage.uploadStartDate,
                                    uploadEnd:stage.uploadEndDate,
                                    file: [
                                        {name: response.fileName, fileId: response.fileId, type:response.type,
                                            stageId:response.stageId, groupId: response.groupId}
                                        ],
                                    color: '#e4e7ed'
                                }
                            )
                        } else {
                            this.stageInfo.push(
                                {
                                    name:stage.name ,
                                    value:stage.id,
                                    start:stage.startDate,
                                    end:stage.endDate,
                                    uploadStart:stage.uploadStartDate,
                                    uploadEnd:stage.uploadEndDate,
                                    color: '#e4e7ed'
                                }
                            )
                        }
                    })
                }
            },

            //获取阶段文件上传情况
            getStageFile(groupId, stageId) {
                return new Promise((resolve) => {
                    const data = new FormData();
                    data.append('groupId', groupId);
                    data.append('stageId', stageId);
                    stageFile(data).then( response => {
                        resolve(response.data.data);
                    })
                })
            },

            //获取所处当前阶段
            getNowStage() {
                const time = Date.parse(format('YYYY-MM-DD HH:mm:ss').replaceAll('-','/'));
                for(let i=0, stages = this.stages ; i<stages.length; i++) {
                    const startDate = Date.parse(stages[i].startDate.replaceAll('-','/'));
                    const endDate = Date.parse(stages[i].endDate.replaceAll('-','/'));
                    if(i !== stages.length && time > startDate && time < endDate) {
                        this.stepActive = i;
                    } else if(i === stages.length && time >endDate) {
                        this.stepActive = 100;
                    }
                }
            },

            //获取阶段状态
            getStageStatus() {
                for (let i=0; i<this.stageInfo.length; i++) {
                    if(i < this.stepActive) {
                        this.stageInfo[i].color = 'lightgreen';
                    }
                    if(i === this.stepActive && this.stageInfo[i].uploadStart === undefined) { //不需要提交作品
                        this.stageInfo[i].color = 'lightgreen';
                    } else if (i === this.stepActive && this.stageInfo[i].uploadStart !== undefined) {
                        if (Object.prototype.hasOwnProperty.call(this.stageInfo[i], 'file')) {
                            if (this.stageInfo[i].file.length === 1) {
                                this.stageInfo[i].color = 'lightgreen';
                            }
                        } else {
                            this.stageInfo[i].color = '#409EFF';
                        }
                    }
                }
            },

            //点击已上传的文件
            handlePreview(file) {
                const data = new FormData();
                data.append('stageId', file.stageId);
                data.append('fileName', file.name);
                data.append('type', file.type);
                data.append('groupId', file.groupId);

                // data.forEach((value, key) => {
                //     console.log(`key ${key}: value ${value}`);
                // })
                userDownloadFile(data).then( response => {
                    console.log(response);
                })
                // userDownloadFile(data).then( response => {
                //     window.open(response.data.data.msg, '_blank')
                // })
            },

            // 移除前
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${file.name} ？`,'提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
            },

            //个人删除文件
            handleRemove(file) {
                const data = new FormData();
                data.append('fileId',file.fileId);
                userDeleteFile(data).then( response => {
                    if(response.data.data.success === true) {
                        this.$message.success('删除成功');
                        this.getStages(this.groupInfo.competitionId);
                        this.getStageStatus();
                    } else {
                        this.$message.error(response.data.data.msg)
                    }
                })
            },

        },
        mounted() {
            this.getGroupInfo();
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/config";

    #editProject {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 0 auto;
        background-color: #fff;

        #competitionName {
            font-size: 26px;
            margin: 0 auto;
            font-family: "幼圆" , serif;
        }

        #projectForm {
            margin: 0 auto;
            background-color: #FFFFFF;
            padding: 50px;
        }

        .teammates {
            border: 1px dashed #bebebe;
            border-radius: 4px;
            padding: 10px 20px;

            .buttons {
                text-align: right;
                margin-right: 20px
            }
        }

        .inviteButton {

        }

        .labelFor {
            width: 70%;
            margin-left: 10px;
        }

        .noTeammate {
            color: $noInfo;
            text-align: center;
        }

        .fileTabs {
            margin: 50px 0 0 0;

            .title {
                margin-bottom: 30px;
                color: #606266;
                font-size: 14px;
            }

            .stageTip {
                line-height: 20px;
            }

            .statusPoint {
                display: inline-block;
                width: 10px;
                height: 10px;
                margin-left: 1em;
                line-height: 16px;
                border-radius: 50%;
            }
        }

        /deep/.el-input.is-disabled .el-input__inner {
            cursor: auto;
            background-color:#ffffff;
            color: #606266;
        }

        /deep/.el-tabs__item {
            height: 60px;
            line-height: 60px;
        }

        /deep/.el-divider--horizontal {
            margin: 10px 0;
        }
    }



</style>