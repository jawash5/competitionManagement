<template>
        <div id="editProject">
            <el-page-header @back="goBack" content="我的项目" class="pull-left"></el-page-header>
            <h1 id="competitionName">查看资料</h1>
            <div id="projectForm">
                <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="比赛名称" prop="type">
                        <el-input v-model="competitionValue"
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
                                <el-input v-model="groupInfo.teammates[0].name" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="队长学号" prop="leaderId">
                                <el-input v-model="groupInfo.teammates[0].studentNo" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="联系手机" prop="telephoneNumber">
                                <el-input v-model="groupInfo.teammates[0].phoneNo" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="邮箱地址" prop="mail">
                                <el-input v-model="groupInfo.teammates[0].email" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="项目成员" prop="members">
                        <template v-if="groupInfo.teammates.length !== 1">
                            <div class="teammates">
                                <el-row v-for="item in groupInfo.teammates"  :key="item.id">
                                    <el-col :span="12">
                                        <label for="">姓名</label>
                                        <el-input class="labelFor" v-model="item.name" placeholder="请输入姓名" size="small" :disabled="true"></el-input>
                                    </el-col>
                                    <el-col :span="12">
                                        <label for="">学号</label>
                                        <el-input class="labelFor" v-model="item.studentNo" placeholder="请输入学号" size="small" :disabled="true"></el-input>
                                    </el-col>
                                </el-row>
                            </div>
                        </template>
                        <template v-if="groupInfo.teammates.length === 1">
                            <div class="noTeammate">无项目成员信息</div>
                        </template>
                    </el-form-item>
                    <el-form-item label="上传文件">
                        <el-upload
                                class="upload-demo"
                                action="#"
                                disabled
                                :file-list="fileList">
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>

            <div id="buttons">
                <el-button type="primary" @click="editForm" v-if="isEdit">立即修改</el-button>
                <el-button type="primary" @click="inviteVisible = true">邀请队友</el-button>
            </div>

            <invite :visible="inviteVisible"
                    @dialogClose="inviteVisible = false"
                    :group-id="groupInfo.id + ''"></invite>
        </div>
</template>

<script>
    import {getGroupInfo,getGroupFiles} from "@/api/userConsole";
    import invite from "@/views/userConsole/components/invite";

    export default {
        name: "editProject" ,
        components:{invite},
        data() {
            return{
                isEdit:true,
                inviteVisible:false,//邀请对话框
                inputValue: '',
                fileList: [],
                options: [],//比赛选择框
                competitionValue: '',//比赛值
                ruleForm: {
                    name: '',
                    teamName:'',
                    leader:'',
                    leaderId:'',
                    telephoneNumber:'',
                    mail: '',
                    members: [
                        { name:'', no:'' }
                    ],
                    teacher:''
                },
                //创建的队伍信息
                groupInfo: {
                    id: '',
                    name: "",
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
                    this.groupInfo = response.data.data;
                    this.competitionValue = this.groupInfo.competitionId;
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
            }
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

        /deep/.el-input.is-disabled .el-input__inner {
            cursor: auto;
            background-color:#ffffff;
            color: #606266;
        }
    }



</style>