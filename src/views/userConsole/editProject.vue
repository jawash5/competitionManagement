<template>
        <div id="editProject">
            <el-page-header @back="goBack" class="pull-left"></el-page-header>
            <div id="competitionName">查看资料</div>
            <el-row>
                <el-col :span="12" id="desc">
                    <div id="projectForm">
                        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="比赛名称" prop="type">
                                <br class="dif">
                                <el-input v-model="groupInfo.competitionName"
                                          class="pull-left"
                                          :disabled="true">
                                </el-input>
                            </el-form-item>

                            <el-divider></el-divider>

                            <el-form-item label="队伍名称" prop="teamName">
                                <br class="dif">
                                <el-input v-model="groupInfo.name" :disabled="true"></el-input>
                            </el-form-item>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="队长姓名"  prop="leader">
                                        <br class="dif">
                                        <el-input v-model="groupInfo.captainName" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-form-item label="联系手机" prop="telephoneNumber">
                                <br class="dif">
                                <el-input v-model="groupInfo.teammates[0].phoneNo" :disabled="true"></el-input>
                            </el-form-item>

                            <el-form-item label="邮箱地址" prop="mail">
                                <br class="dif">
                                <el-input v-model="groupInfo.teammates[0].email" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="项目成员" prop="members">
                                <template v-if="groupInfo.teammates.length !== 1">
                                    <div class="teammates">
                                        <template v-for="(item,index) in groupInfo.teammates.slice(1)">
                                            <el-row :gutter="20" :key="index">
                                                <el-col :span="12">
                                                    <label for="">姓名</label>
                                                    <br class="dif">
                                                    <el-input class="labelFor"
                                                              v-model="item.name"
                                                              placeholder="请输入姓名"
                                                              size="small"
                                                              :disabled="true"></el-input>
                                                </el-col>
                                                <el-col :span="12">
                                                    <label for="">学号</label>
                                                    <br class="dif">
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
                                    <div class="noTeammate">无其他成员</div>
                                </template>
                                <div v-if="isLeader">
                                    <el-button type="primary" size="small" @click="inviteVisible = true">邀请队友</el-button>
                                    <el-button type="primary" size="small" @click="deleteTeam">解散队伍</el-button>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="6" :offset="2" id="competitionState">
                    <div class="fileTabs">
                        <div style="color: #606266">比赛状态
                            <div class="statusPoint" style="background-color: lightgreen"></div> 成功
                            <div class="statusPoint" style="background-color: #409EFF"></div> 文件未提交
                            <div class="div-15"></div>
                            <div class="statusPoint" style="background-color: red; margin-left: 6em"></div> 淘汰
                            <div class="statusPoint" style="background-color: #E4E7ED"></div> 阶段尚未开始
                        </div>
                        <div class="div-30"></div>
                        <el-timeline>
                            <el-timeline-item v-for="(item,index) in stageInfo"
                                              :key="item.id"
                                              :timestamp="item.name"
                                              :color="item.color"
                                              placement="top">
                                <el-card>
                                    <div class="stageTip">阶段持续时间：{{item.start}} 至 {{item.end}}</div>
                                    <div class="div-15"></div>
                                    <div class="stageTip" v-if="item.uploadStart !== undefined">文件提交时间：{{item.uploadStart}} 至 {{item.uploadEnd}}</div>
                                    <div class="div-15"></div>
                                    <div class="pull-center">
                                        <el-button v-if="isUploadTime[index] && isLeader "
                                                   type="primary"
                                                   size="mini"
                                                   @click="uploadFile(index)">上传文件</el-button>
                                    </div>
                                    <el-upload
                                            style="margin-top: -10px"
                                            action="#"
                                            :disabled="!isUploadTime[index] || !isLeader"
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

            <invite :visible.sync="inviteVisible"
                    :group-id="groupInfo.id"></invite>

            <upload :visible.sync="uploadDialog"
                    :competition-id="groupInfo.competitionId"
                    :stage-id="stages[clickIndex].id"
                    :group-id="groupInfo.id"
                    @success="getStages(groupInfo.competitionId)"></upload>

            <progress-loading :visible.sync="loading"
                              :is-finished.sync="finish"></progress-loading>
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
        userDeleteFile,
        deleteTeam
    } from "@/api/userConsole";
    import invite from "@/views/userConsole/components/invite";
    import {competitionDetail} from "@/api/login";
    import upload from "@/views/userConsole/components/upload";
    import format from "@/utils/timeFormat";
    import progressLoading from "@/components/progressLoading";

    export default {
        name: "editProject" ,
        components:{invite,upload,progressLoading},
        data() {
            return{
                inviteVisible:false,//邀请对话框
                loading:false,//加载框显示
                finish:false,//加载框是否完成
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
                    id: 0,
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
                stepActive:-1,//当前所处阶段值
                isUploadTime:[],//文件提交时间
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
                clickIndex: 0,
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
            //阶段排序
            sortStages(key, value) {
                value.sort((a, b) => {
                    const data1 = Date.parse(a[key].replace(/-/g,'/'));
                    const data2 = Date.parse(b[key].replace(/-/g,'/'));
                    return data1 - data2;
                })
            },
            //获取比赛阶段
            getStages(competitionId) {
                    competitionDetail(competitionId).then( async response => {
                        let stages = response.data.data.stages;
                        this.sortStages('startDate',stages)//按开始时间排序
                        this.stages = stages;
                        this.stageInfo = [];
                        await this.pushStageInfo(stages);
                        this.getNowStage();//获取当前阶段
                        this.checkUpload();
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
                let stepActive = -1;
                const time = Date.parse(format('YYYY-MM-DD HH:mm:ss').replace(/-/g,'/'));//获取当前时间

                for(let i=0, stages = this.stages ; i<stages.length; i++) {
                    //阶段持续时间
                    const startDate = Date.parse(stages[i].startDate.replace(/-/g,'/'));
                    const endDate = Date.parse(stages[i].endDate.replace(/-/g,'/'));

                    if (i < stages.length-1) {                 //如果在最后一个阶段前
                        const startDateNext = Date.parse(stages[i+1].startDate.replace(/-/g,'/'));
                        if (time > startDate && time < endDate) {
                            stepActive = i
                        } else if ( time > endDate && time < startDateNext) {
                            stepActive = i + 0.5
                        }
                    } else if (i === stages.length-1) {       //最后一个阶段验证
                        if (time > startDate && time < endDate) {
                            stepActive = i
                        } else if(time > endDate) {
                            stepActive = 100;
                        }
                    }
                }
                this.stepActive = stepActive
            },

            //判断文件是否目前能上传
            checkUpload() {
                let stages = this.stages;
                let isUploadTime = new Array(stages.length);
                const time = Date.parse(format('YYYY-MM-DD HH:mm:ss').replace(/-/g,'/'));//获取当前时间
                for(let i=0 ; i<stages.length; i++) {
                    if (Object.prototype.hasOwnProperty.call(stages[i], 'uploadStartDate')) {
                        const uploadStartDate = Date.parse(stages[i].uploadStartDate.replace(/-/g,'/'));
                        const uploadEndDate = Date.parse(stages[i].uploadEndDate.replace(/-/g,'/'));
                        if (time > uploadStartDate && time < uploadEndDate) {
                            isUploadTime[i] = true;
                        }
                    }
                }
                this.isUploadTime = isUploadTime;
            },

            //获取阶段状态
            getStageStatus() {
                for (let i=0; i<this.stageInfo.length; i++) {
                    if(i <= this.stepActive && this.stageInfo[i].uploadStart === undefined) { //不需要提交作品
                        this.stageInfo[i].color = 'lightgreen';
                    } else if (i <= this.stepActive && this.stageInfo[i].uploadStart !== undefined) {//需要提交作品
                        if (Object.prototype.hasOwnProperty.call(this.stageInfo[i], 'file') &&
                            this.stageInfo[i].file.length === 1) {
                                this.stageInfo[i].color = 'lightgreen';
                        } else {
                            this.stageInfo[i].color = '#409EFF';
                        }
                    } else if (this.isUploadTime[i] === true) {
                        if (Object.prototype.hasOwnProperty.call(this.stageInfo[i], 'file') &&
                            this.stageInfo[i].file.length === 1) {
                            this.stageInfo[i].color = 'lightgreen';
                        } else {
                            this.stageInfo[i].color = '#409EFF';
                        }
                    }
                }
            },

            //点击已上传的文件
            handlePreview(file) {
                const data = new FormData();
                data.append('fileId', file.fileId);
                this.loading = true;
                userDownloadFile(data).then( response => {
                    if (response.data.data.success === true) {
                        this.finish = true;
                        const url = response.data.data.msg.replace('-internal', '');
                        window.open(url, '_blank')
                    }
                })
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

            //上传文件
            uploadFile(stageIndex) {
                this.uploadDialog = true;
                this.clickIndex = stageIndex;
            },

            //解散队伍
            deleteTeam() {
                this.$prompt('请输入队伍名称确认', '删除队伍', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    console.log(value)
                    if (value === this.groupInfo.name) {
                        const data = new FormData;
                        data.append('groupId', this.groupInfo.id);
                        deleteTeam(data).then( response => {
                            if (response.data.data.success === true) {
                                this.$message.success('解散成功');
                                this.$router.push('/myProject');
                                sessionStorage.removeItem('groupList');
                            }
                        })
                    }
                });
            }
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
            margin: 0 auto;
            text-align: center;
            font-size: 26px;
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

    @media screen and(max-width: 420px){

        #competitionState{
            display: none;
        }

        #desc{
            margin-left: -25vw;
        }

        #dif{
            display: block;
        }

        /deep/ .el-input__inner{
            margin-left:-19vw;
            width:45vw;
            display:block;
        }


    }

    @media screen and(max-width: 350px){

        /deep/ .el-input__inner{
            margin-left:-35vw;
            width:50vw;
            display:block;
        }

    }

    @media screen and (min-width: 421px){
        .dif{
            display: none;
        }
    }


</style>
