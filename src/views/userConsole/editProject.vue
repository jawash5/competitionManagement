<template>
        <div id="editProject">
            <el-page-header @back="goBack" content="我的项目" class="pull-left"></el-page-header>
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
                                            <div :key="index + 'btn'" class="buttons" v-if="editTeammate">
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
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="6" :offset="2">
                    <div class="fileTabs">
<!--                        <div class="title">文件上交情况</div>-->
<!--                        <el-tabs tab-position="left" v-model="stageActiveName">-->
<!--                            <el-tab-pane v-for="item in stageFiles"-->
<!--                                         :key="item.id"-->
<!--                                         :label="item.label"-->
<!--                                         :name="item.name">-->
<!--                                    <el-upload-->
<!--                                            class="upload-demo"-->
<!--                                            action="#"-->
<!--                                            disabled-->
<!--                                            :file-list="fileList">-->
<!--                                    </el-upload>-->
<!--                                </el-tab-pane>-->
<!--                        </el-tabs>-->

                        <el-timeline>
                            <el-timeline-item v-for="item in stageFiles"
                                              :key="item.id"
                                              :timestamp="item.label"
                                              placement="top">
                                <el-card>
                                    <el-upload
                                            class="upload-demo"
                                            action="#"
                                            disabled
                                            :file-list="fileList">
                                    </el-upload>
                                </el-card>
                            </el-timeline-item>

                        </el-timeline>

                    </div>

                </el-col>
            </el-row>

            <div id="buttons" v-if="editTeammate">
                <el-button type="primary" @click="editForm" v-if="isEdit">立即修改</el-button>
                <el-button type="primary" @click="inviteVisible = true">邀请队友</el-button>
            </div>

            <invite :visible="inviteVisible"
                    :dialogClose.sync="inviteVisible"
                    :group-id="groupInfo.id + ''"></invite>
        </div>
</template>

<script>
    import {getGroupFiles, getGroupInfo, personalInfo, appointCaptain, deleteTeammate} from "@/api/userConsole";
    import invite from "@/views/userConsole/components/invite";
    import {competitionDetail} from "@/api/login";
    import sortValue from "@/utils/sort";
    // import format from "@/utils/timeFormat";

    export default {
        name: "editProject" ,
        components:{invite},
        data() {
            return{
                isEdit:true,
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
                stageFiles:[],
                editTeammate:false,
                captainId: '',
            }
        },
        methods: {
            editForm() {
                this.isEdit = false;
            },
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
                    this.getStages(this.groupInfo.competitionId)
                });
            },
            //获取组文件
            getFiles() {
                const groupId = this.$store.getters['group/groupId'];
                getGroupFiles(groupId).then( response => {
                    const data = response.data.data;
                    for(let i=0; i<data.length; i++) {
                        this.fileList.push({name:data[i].fileName, url:''})
                    }
                })
            },
            //获取角色修改权限信息
            getPersonalAuthority() {
                personalInfo().then( response => {
                    this.captainId = response.data.data.id;
                    this.editTeammate = (this.captainId === this.groupInfo.captainId);
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
                competitionDetail(competitionId).then( response => {
                    const stages = response.data.data.stages;
                    this.stageFiles = [];
                    for (const stage of stages) {
                        this.stageFiles.push({label: stage.name, name:stage.name})
                    }
                    sortValue(this.stageFiles, 'id')
                })
            }


            // //获取所处当前阶段
            // getNowStage() {
            //     const time = Date.parse(format('YYYY-MM-DD HH:mm:ss').replaceAll('-','/'));
            //     for(let i=0, stages=this.competitionInfo.stages ; i<stages.length; i++) {
            //         const startDate = Date.parse(stages[i].startDate.replaceAll('-','/'));
            //         const endDate = Date.parse(stages[i].endDate.replaceAll('-','/'));
            //         if(time > startDate && time < endDate) {
            //             this.stepActive = i
            //         }
            //     }
            // },

        },
        mounted() {
            this.getGroupInfo();
            this.getFiles();
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
        background-color: #FFFFFF;

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

        #buttons {
            margin: 20px auto;
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