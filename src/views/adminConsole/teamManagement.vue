<template>
    <div id="teamManagement">
        <el-form>
            <el-row>
                <el-col :span="12">
                    <el-form-item>
                        <el-select v-model="yearValue"
                                   placeholder="比赛年份"
                                   size="small"
                                   style="width: 100px;margin-right: 20px"
                                   @change="handleYearChange">
                            <el-option
                                    v-for="item in competitionYearOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-model="stageValue"
                                   placeholder="请选择比赛阶段"
                                   size="small"
                                   @change="getFilesSignUp">
                            <el-option
                                    v-for="item in stageOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button @click="relatedTeacher" size="small" style="margin-left: 22px;">关联评委</el-button>
                    </el-form-item>
                    <hr class="dif3"/>
                </el-col>
                <el-col :span="8" :offset="4" class="dif2">
                    <el-form-item class="pull-right">
                        <el-select v-model="searchKeyValue"
                                   placeholder="搜索关键字"
                                   size="small"
                                   style="width: 100px;line-height: 40px;margin-right: 10px">
                            <el-option
                                    v-for="item in searchOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input placeholder="请输入搜索内容" v-model="search" size="small" style="width: 130px"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-table
                ref="multipleTable"
                :data="searchInfo()"
                tooltip-effect="dark"
                stripe
                style="width: 100%;height: 60vh;overflow: auto"
                v-loading="dataLoading"
                :default-sort = "{ prop: 'type', order: 'descending'}"
                @selection-change="handleChange">
            <el-table-column
                    type="selection"
                    width="50"
                    align="center">
            </el-table-column>

            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" class="demo-table-expand">
                        <el-form-item label="队伍名称">
                            <span>{{ props.row['name'] }}</span>
                        </el-form-item>
                        <el-form-item label="队长姓名">
                            <span>{{ props.row['captainName'] }}</span>
                        </el-form-item>
                        <el-form-item label="队伍邮箱">
                            <span>{{ props.row['email'] }}</span>
                        </el-form-item>
                        <el-form-item label="领队电话">
                            <span>{{ props.row['captainPhone'] }}</span>
                        </el-form-item>
                        <el-form-item label="小组成员">
                            <div style="margin-left: 90px">
                                <div v-for="item in props.row.teammates" :key="item.id">
                                    <span class="title">姓名：</span>{{ item.name }}
                                    <span class="title">学号：</span>{{item.studentNo}}
                                    <span class="title">学院：</span>{{item.school}}
                                    <span class="title">电话：</span>{{item.phoneNo}}
                                    <span class="title">邮箱：</span>{{item.email}}
                                </div>
                            </div>
                        </el-form-item>

                    </el-form>
                </template>
            </el-table-column>

            <el-table-column
                    type="index"
                    width="50"
                    align="center"
                    label="序号">
            </el-table-column>

            <el-table-column
                    prop="type"
                    label="组别"
                    sortable
                    align="center"
                    width="100">
            </el-table-column>

            <el-table-column
                    prop="name"
                    label="队伍名称"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>

            <el-table-column
                    prop="captainName"
                    label="队长姓名"
                    width="100"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>

            <el-table-column
                    prop="email"
                    label="队伍邮箱"
                    width="250"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>

            <el-table-column
                    prop="captainPhone"
                    label="领队电话"
                    width="200"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>

            <el-table-column
                    prop="expireAt"
                    label="晋级"
                    sortable
                    width="100"
                    align="center">
                <template slot-scope="scope">
                    <span>{{isPromotion(scope.row)}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="file"
                    label="上交"
                    sortable
                    width="120"
                    align="center">
            </el-table-column>

        </el-table>
        <hr class="dif7">
        <div class="div-30"></div>

            <div class="dif5">
<!--                <el-button size="small">批量删除</el-button>-->
                <el-button size="small" type="primary" round @click="changeOutStatus" class="dif6">淘汰队伍</el-button>
                <el-button size="small" type="primary" round @click="downloadGroupInfo">下载信息</el-button>
                <el-button size="small" type="primary" round @click="sendNotice">发送通知</el-button>
                <el-button size="small" type="primary" round @click="downloadFile">文件下载</el-button>
                <el-button size="small" type="primary" round @click="handUpTask">任务分派/取消</el-button>
<!--                <el-button size="small">成绩添加</el-button>-->
            </div>


        <out-status :visible.sync="outStatusVisible"
                    :stage-value="stageValue"
                    @success="getCompetitionGroups(yearValue)"></out-status>
        <edit-group-info :visible.sync="editGroupInfoVisible"
                         :groupInfo="groupInfo"></edit-group-info>
        <send-message :visible.sync="sendMessageVisible"></send-message>
        <download-files :visible.sync="downloadFilesVisible"
                        :stage="stageValue"></download-files>
        <progress-loading :visible.sync="loading"
                          :isFinished.sync="finish"></progress-loading>
        <select-judges :visible.sync="selectJudgesVisible"
                       :competition-id="competitionId"></select-judges>
        <hand-up-tasks :visible.sync="handUpTaskVisible"
                       :competition-id="competitionId"></hand-up-tasks>

    </div>

</template>

<script>
    import {
        getAdminCompetition,
        getCompetitionGroups,
        getStageFile,
        downloadGroupInfo,
        yearCompetitionId,
        showType
    } from "@/api/adminConsole";
    import sendMessage from "@/views/adminConsole/components/sendMessage";
    import downloadFiles from "@/views/adminConsole/components/downloadFiles";
    import editGroupInfo from "@/views/adminConsole/components/editGroupInfo";
    import outStatus from "@/views/adminConsole/components/outStatus";
    import sortValue from "@/utils/sort";
    import progressLoading from "@/components/progressLoading";
    import selectJudges from "@/views/adminConsole/components/selectJudges";
    import handUpTasks from "@/views/adminConsole/components/handUpTasks";

    export default {
        name: "teamManagement",
        components:{sendMessage,editGroupInfo,outStatus,downloadFiles,progressLoading,selectJudges,handUpTasks},
        data() {
            return {
                //比赛阶段选项
                stageOptions: [],
                //比赛阶段选择值
                stageValue: '',
                //比赛年份选项
                competitionYearOptions: [],
                //比赛年份
                yearValue:'',
                //关键词选项
                searchOptions: [
                    { value: 'name', label: '队伍名称' },
                    { value: 'captainName', label: '队长姓名' },
                    { value: 'email', label: '队伍邮箱' },
                    { value: 'captainPhone', label: '领队电话' },
                    { value: 'teammateName', label: '组员姓名' },
                    { value: 'type', label: '组别' },
                ],
                //关键词
                searchKeyValue: 'name',
                //管理员维护的比赛列表
                AdminCompetition:[],
                //表单参数
                tableData: [],
                groupInfo: {},//编辑框传参
                editGroupInfoVisible:false, //编辑对话框
                sendMessageVisible:false,//发送通知对话框
                downloadFilesVisible:false,//下载文件对话框
                outStatusVisible:false,//晋级选项框
                selectJudgesVisible:false,//裁判对话框
                handUpTaskVisible:false,//任务分派
                loading:false,//加载框
                finish:false,//加载是否完成
                chosenGroups:[],//左侧多选数组
                search:'',//搜索参数
                competitionId: '',//比赛id
                dataLoading: false,
            };
        },
        methods: {
            //编辑
            handleEdit(groupInfo) {
                this.editGroupInfoVisible = true;
                this.groupInfo = groupInfo;
            },
            //比赛年发生变化
            handleYearChange(year) {
                this.dataLoading = true;
                this.getCompetitionGroups(year);
                this.getCompetitionStage(year);
                this.getCompetitionId(year);
            },
            //晋级信息显示
            isPromotion(row) {
                if (Object.prototype.hasOwnProperty.call(row, 'expireAt')) {
                    if (row.expireAt <= this.stageValue) {
                        return '❌';
                    } else if (row.expireAt > this.stageValue){
                        return '⭕';
                    }
                } else {
                    return '⭕';
                }
            },
            //获取比赛组,添加文件上交情况，组别情况
            getCompetitionGroups(year) {
                getCompetitionGroups(year).then( async response => {
                    let tableData = response.data.data;

                    //获取队伍文件上交情况
                    await getStageFile(this.stageValue).then( res => {
                        const signUpGroups = res.data.data;
                        for (const signUpGroup of signUpGroups) {
                            for (let i=0; i<tableData.length; i++) {
                                if (tableData[i].id === signUpGroup.groupId) {
                                    tableData[i].file = '⭕';
                                    break;
                                }
                            }
                        }
                        for (const group of tableData) {
                            if(!Object.prototype.hasOwnProperty.call(group, 'file')) {
                                group.file = '❌';
                            }
                        }
                        //获取组别
                        this.getType(tableData);
                    })
                    this.dataLoading = false;
                })
            },
            //获取各小组的组别
            getType(groupList) {
                let groupIdList = [];
                for (const group of groupList) {
                    groupIdList.push(group.id);
                }
                const data = {
                    'groupIdList': groupIdList
                }
                showType(data).then( response => {
                    const type = response.data.data
                    for (let i=0; i<groupList.length; i++) {
                        if (Object.prototype.hasOwnProperty.call(type, groupList[i].id+'')) {
                            groupList[i]['type'] = type[groupList[i].id+''];
                        }
                    }
                    this.tableData = groupList;
                })
            },
            //阶段切换时，获取文件列表，查看作品是否提交
            getFilesSignUp() {
                let tableData = this.tableData;
                getStageFile(this.stageValue).then( response => {
                    const signUpGroups = response.data.data;
                    //初始化上交情况
                    for (const group of tableData) {
                        group.file = '❌';
                    }
                    //提交小组单独处理
                    if (signUpGroups.length !== 0) {
                        for (const signUpGroup of signUpGroups) {
                            for (let i=0; i<tableData.length; i++) {
                                if (tableData[i].id === signUpGroup.groupId) {
                                    tableData[i].file = '⭕';
                                    break;
                                }
                            }
                        }
                    }

                } )
            },
            //获取比赛年，表现在年份下拉框中
            getCompetitionYear() {
                this.stageValue = '';//阶段值清空
                if (this.competitionYearOptions.length === 0) {
                    getAdminCompetition().then(response => {
                        let competitionList =  response.data.data;//管理员维护的比赛列表
                        sortValue(competitionList,'year')
                        sessionStorage.setItem('competitionList',JSON.stringify(competitionList));
                        for(let competition of competitionList) {
                            this.competitionYearOptions.push({
                                label: competition.year + '年',
                                value: competition.year
                            })
                        }
                    })
                }
            },
            //获取比赛年Id
            getCompetitionId(year) {
                yearCompetitionId(year).then( response => {
                    this.competitionId = response.data.data;
                })
            },
            //获取比赛阶段信息
            getCompetitionStage(year) {
                const competitionList =  JSON.parse(sessionStorage.getItem('competitionList'));
                for(const competition of competitionList) {
                    if(competition.year === year) {
                        let stages = competition.stages;
                        sortValue(stages, 'id');
                        this.stageOptions = [];
                        for(let i=0; i< stages.length; i++) {
                            this.stageOptions.push({
                                value: stages[i].id,
                                label: stages[i].name
                            })
                        }
                        this.stageValue = this.stageOptions[0].value;
                    }
                }
            },
            //发送通知
            sendNotice() {
                if(this.chosenGroups.length === 0) {
                    this.$message('请先选择比赛组！')
                } else {
                    this.sendMessageVisible = true;
                    this.$store.commit('sendNotice/SET_CHOSEN_GROUPS', this.chosenGroups)
                }
            },
            //下载文件
            downloadFile() {
                if (this.stageValue === '') {
                    this.$message('请先选择比赛与比赛阶段');
                    return false;
                }
                this.downloadFilesVisible = true;
            },
            //关联评委
            relatedTeacher() {
                if (this.stageValue === '') {
                    this.$message('请先选择比赛与比赛阶段');
                    return false;
                }
                this.selectJudgesVisible = true;
            },
            //任务分派
            handUpTask() {
                this.handUpTaskVisible = true;
            },
            //左侧多选选中事件
            handleChange(selection) {
                this.chosenGroups = selection;
            },
            //下载队伍信息
            downloadGroupInfo() {
                if (this.chosenGroups.length === 0) {
                    this.$message('请先选择小组');
                    return false;
                }
                this.loading = true;
                let groupList = [];
                for(const group of this.chosenGroups) {
                    groupList.push(group.id)
                }

                const data = {
                    cid: this.competitionId,
                    groupList: groupList
                };
                downloadGroupInfo(data).then( response => {
                    let fileName = '小组信息';// 文件名
                    let blob = new Blob([response.data], {
                        type:
                            "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    });
                    this.finish = true;//下载完成，进度条加快
                    if (window.navigator.msSaveOrOpenBlob) {
                        navigator.msSaveBlob(blob);
                    } else {
                        let elink = document.createElement("a");
                        elink.href = URL.createObjectURL(blob);
                        elink.download = fileName;
                        elink.style.display = "none";
                        document.body.appendChild(elink);
                        elink.click();
                        document.body.removeChild(elink);
                    }
                })
            },
            //改变淘汰状态
            changeOutStatus() {
                if(this.chosenGroups.length === 0) {
                    this.$message('请选择小组');
                    return false;
                }
                this.$store.commit('sendNotice/SET_CHOSEN_GROUPS', this.chosenGroups)
                this.outStatusVisible = true;
            },
            //搜索
            searchInfo() {
                if(this.searchKeyValue === 'name') {
                    return this.tableData.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()));
                } else if (this.searchKeyValue === 'captainName') {
                    return this.tableData.filter(data => !this.search || data.captainName.toLowerCase().includes(this.search.toLowerCase()))
                } else if (this.searchKeyValue === 'email') {
                    return this.tableData.filter(data => !this.search || data.email.toLowerCase().includes(this.search.toLowerCase()))
                } else if (this.searchKeyValue === 'captainPhone') {
                    return this.tableData.filter(data => !this.search || data.captainPhone.toLowerCase().includes(this.search.toLowerCase()))
                } else if (this.searchKeyValue === 'teammateName') {
                    return this.tableData.filter(data => {
                        let flag = false;
                        for(const teammate of data.teammates) {
                            if(teammate.name.toLowerCase().includes(this.search.toLowerCase())) {
                                flag = true;
                            }
                        }
                        return !this.search || flag;
                    })
                } else if (this.searchKeyValue === 'type') {
                    return this.tableData.filter(data => !this.search || data.type.toLowerCase().includes(this.search.toLowerCase()))
                }
            },
        },
        mounted() {
            this.getCompetitionYear();
            // this.handleYearChange(this.yearValue);

        }
    }
</script>

<style lang="scss" scoped>
    #teamManagement {
        background-color: #FFFFFF;
        margin: 0 auto;
        padding: 20px;

        /deep/.el-table thead {
            font-weight: bold;
            color: #344a5f;
        }

        /deep/.el-table th>.cell {
            line-height: 34px;
        }

        .el-table::before {
            height: 0;
        }

        .demo-table-expand {

            .title:not(:first-of-type) {
                margin-left: 2em;
            }

            /deep/.el-form-item__label {
                width: 90px;
                color: #99a9bf;
            }

            /deep/.el-form-item {
                margin-right: 0;
                margin-bottom: 0;
            }
        }
    }

    @media screen and (max-width: 420px){

        /deep/ .el-select.el-select--small{
            width: 40vw;
        }

        /deep/.el-table{
            margin-top:20vh;
        }

        .dif2{
            position: absolute;
            top: 15vh;
            right: 2vw;
        }

        .dif3{
            position: absolute;
            width: 60vw;
            top: 12vh;
            right: -8vw;
            height: 1px;
            color: #666666;
        }

        .dif4{
            position: absolute;
            width: 60vw;
            top: 14vh;
            right: -10vw;
            height: 1px;
            color: #cccccc;
        }

        .dif5{
            padding-top: 0;
            line-height: 6vh;
        }

        .dif6{
            margin-left: 2.2vw;
        }

        .dif7{
            position: absolute;
            width: 60vw;
            bottom: 38vh;
            right: 0;
            height: 1px;
            color: #cccccc;
        }

    }

    @media screen and (min-width: 421px){

        .dif3,.dif4,.dif7{
            display: none;
        }
    }


</style>
