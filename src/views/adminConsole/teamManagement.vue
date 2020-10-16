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
                                   size="small">
                            <el-option
                                    v-for="item in stageOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :offset="4">
                    <el-form-item class="pull-right">
                        <el-select v-model="searchKeyValue"
                                   placeholder="搜索关键字"
                                   size="small"
                                   style="width: 100px;line-height: 40px">
                            <el-option
                                    v-for="item in searchOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input placeholder="请输入搜索内容" v-model="search" size="small" style="width: 130px; margin-left: 10px"></el-input>
                    </el-form-item>

                </el-col>
            </el-row>
        </el-form>

        <el-table
                ref="multipleTable"
                :data="searchInfo()"
                tooltip-effect="dark"
                stripe
                style="width: 100%"
                :default-sort = "{prop: 'projectName', order: 'descending'}"
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
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="队长姓名">
                            <span>{{ props.row.captainName }}</span>
                        </el-form-item>
                        <el-form-item label="队伍邮箱">
                            <span>{{ props.row.email }}</span>
                        </el-form-item>
                        <el-form-item label="领队电话">
                            <span>{{ props.row.captainPhone }}</span>
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
                    width="100"
                    align="center"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{isPromotion(scope.row)}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="submit"
                    label="上交"
                    width="120"
                    align="center"
                    sortable>
                <template slot-scope="scope">
                    <span v-for="item in tableData[scope.$index].isSubmit"
                          :key="item.id">{{item.state === true? '〇':'✖' }}</span>
                </template>
            </el-table-column>

        </el-table>

        <div class="div-30"></div>
        <el-row>
            <el-col :span="12">
<!--                <el-button size="small">批量删除</el-button>-->
                <el-button size="small" type="primary" round @click="changeOutStatus">淘汰队伍</el-button>
                <el-button size="small" type="primary" round @click="downloadGroupInfo">下载信息</el-button>
                <el-button size="small" type="primary" round @click="sendNotice">发送通知</el-button>
                <el-button size="small" type="primary" round @click="downloadFile">文件下载</el-button>
<!--                <el-button size="small">成绩添加</el-button>-->
            </el-col>
            <el-col :span="12">

            </el-col>
        </el-row>

        <out-status :visible="outStatusVisible"
                    :dialogClose.sync="outStatusVisible"
                    :stage-value="stageValue"
                    @success="getCompetitionGroups(yearValue)"></out-status>
        <edit-group-info :visible="editGroupInfoVisible"
                         :dialogClose.sync="editGroupInfoVisible"
                         :groupInfo="groupInfo"></edit-group-info>
        <send-message :visible="sendMessageVisible"
                      :dialogClose.sync="sendMessageVisible"></send-message>
        <download-files :visible="downloadFilesVisible"
                        :dialogClose.sync="downloadFilesVisible"
                        :stage="stageValue"></download-files>
    </div>

</template>

<script>
    import {getAdminCompetition, getCompetitionGroups, getStageFile, downloadGroupInfo} from "@/api/adminConsole";
    import sendMessage from "@/views/adminConsole/components/sendMessage";
    import downloadFiles from "@/views/adminConsole/components/downloadFiles";
    import editGroupInfo from "@/views/adminConsole/components/editGroupInfo";
    import outStatus from "@/views/adminConsole/components/outStatus";
    import sortValue from "@/utils/sort";

    export default {
        name: "teamManagement",
        components:{sendMessage,downloadFiles,editGroupInfo,outStatus},
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
                chosenGroups:[],//左侧多选数组
                search:'',//搜索参数
                competitionId:'',//比赛id
            };
        },
        computed: {
            total() {
                return this.tableData.length;
            },
        },
        methods: {
            //编辑
            handleEdit(groupInfo) {
                this.editGroupInfoVisible = true;
                this.groupInfo = groupInfo;
            },
            //比赛年发生变化
            handleYearChange(year) {
                this.getCompetitionGroups(year);
                this.getCompetitionStage(year);
            },
            //晋级信息显示
            isPromotion(row) {
                if (Object.prototype.hasOwnProperty.call(row, 'expireAt')) {
                    if (row.expireAt <= this.stageValue) {
                        return '×';
                    } else if (row.expireAt > this.stageValue){
                        return '√';
                    }
                } else {
                    return '√';
                }
            },
            //获取比赛组
            getCompetitionGroups(year) {
                    getCompetitionGroups(year).then( response => {
                    this.tableData = response.data.data;
                    this.competitionId = response.data.data[0].competitionId
                })

            },
            //获取比赛年
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
            //获取文件列表
            getFiles() {
                const data = {
                    stage: this.competitionValue,
                    year: this.yearValue
                };
                getStageFile(data).then( response => {
                    this.fileList = response.data.data;
                } )
            },
            //下载文件
            downloadFile() {
                this.downloadFilesVisible = true;
            },
            //左侧多选选中事件
            handleChange(selection) {
                this.chosenGroups = selection;
            },
            //下载队伍信息
            downloadGroupInfo() {
                let groupList = [];
                for(const group of this.chosenGroups) {
                    groupList.push(group.id)
                }

                const data = {
                    cid: this.competitionId,
                    groupList: groupList
                }
                downloadGroupInfo(data).then( response => {
                    let fileName = '小组信息';// 文件名
                    let blob = new Blob([response.data], {
                        type:
                            "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    });
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


</style>