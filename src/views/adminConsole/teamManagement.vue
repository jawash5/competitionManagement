<template>
    <div id="teamManagement">
        <el-form>
            <el-row>
                <el-col :span="12">
                    <el-form-item>
                        <el-select v-model="stageValue" placeholder="请选择比赛阶段" size="small">
                            <el-option
                                    v-for="item in stageOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                        <el-select v-model="yearValue"
                                   placeholder="比赛年份"
                                   size="small"
                                   style="width: 100px;margin-left: 20px"
                                   @change="handleYearChange">
                            <el-option
                                    v-for="item in competitionYearOptions"
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

            <el-table-column
                    type="index"
                    width="50"
                    align="center"
                    label="序号">
            </el-table-column>

            <el-table-column
                    prop="teamName"
                    label="队伍名称"
                    align="center"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{ tableData[scope.$index].name }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="name"
                    label="队长姓名"
                    width="100"
                    align="center"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{ tableData[scope.$index].captainName }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="mail"
                    label="队伍邮箱"
                    width="250"
                    align="center"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{ tableData[scope.$index].email }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="submit"
                    label="上交"
                    width="80"
                    align="center"
                    sortable>
                <template slot-scope="scope">
                    <span v-for="item in tableData[scope.$index].isSubmit"
                          :key="item.id">{{item.state === true? '〇':'✖' }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="promotion"
                    label="晋级"
                    width="80"
                    align="center"
                    sortable>
                <template slot-scope="scope">
                    <span v-for="item in tableData[scope.$index].isPromote"
                          :key="item.id">{{item.state === true? '〇':'✖' }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    width="120"
                    align="center"
                    label="作品审核"
                    sortable>
                <template slot-scope="scope">
                    <span>{{tableData[scope.$index].isCheck === true? '已审核':'未审核' }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="grades"
                    label="得分"
                    width="80"
                    sortable
                    align="center">
                <template slot-scope="scope">
                    <span>{{ tableData[scope.$index].grades }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="80">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(tableData[scope.$index])"
                            >编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="div-30"></div>
        <el-row>
            <el-col :span="12">
<!--                <el-button size="small">批量删除</el-button>-->
<!--                <el-button size="small">修改权限</el-button>-->
<!--                <el-button size="small" >下载信息</el-button>-->
                <el-button size="small" @click="sendNotice">发送通知</el-button>
                <el-button size="small" @click="downloadFile">文件下载</el-button>
<!--                <el-button size="small">成绩添加</el-button>-->
            </el-col>
            <el-col :span="12">

            </el-col>
        </el-row>

        <edit-group-info :visible="editGroupInfoVisible"
                         @dialogClose="editGroupInfoVisible = false"
                         :groupInfo="groupInfo"></edit-group-info>
        <send-message :visible="sendMessageVisible"
                      @dialogClose="sendMessageVisible = false"></send-message>
        <download-files :visible="downloadFilesVisible"
                        @dialogClose="downloadFilesVisible = false"
                        :year="yearValue"
                        :stage="stageValue"></download-files>
    </div>

</template>

<script>
    import {getAdminCompetition, getCompetitionGroups, getStageFile} from "@/api/adminConsole";
    import sendMessage from "@/views/adminConsole/components/sendMessage";
    import downloadFiles from "@/views/adminConsole/components/downloadFiles";
    import editGroupInfo from "@/views/adminConsole/components/editGroupInfo";

    export default {
        name: "teamManagement",
        components:{sendMessage,downloadFiles,editGroupInfo},
        data() {
            return {
                //比赛阶段选项
                stageOptions: [],
                //比赛阶段选择值
                stageValue: '',
                //比赛年份选项
                competitionYearOptions: [],
                //比赛年份
                yearValue:'2019',
                //关键词选项
                searchOptions: [
                    { value: 'name', label: '队伍名称' },
                    { value: 'captainName', label: '队长姓名' },
                ],
                //关键词
                searchKeyValue: 'name',
                //管理员维护的比赛列表
                AdminCompetition:[],
                //表单参数
                tableData: [],
                //比赛组参数
                groups:[
                    {
                        id: '',
                        name: '',
                        competitionId: '',
                        captainId: '',
                        captainName: ''
                    },
                ],
                groupInfo: {},//编辑框传参
                editGroupInfoVisible:false, //编辑对话框
                sendMessageVisible:false,//发送通知对话框
                downloadFilesVisible:false,//下载文件对话框
                chosenGroups:[],//左侧多选数组
                search:'',//搜索参数
            };
        },
        computed: {
          total (){
              return this.tableData.length;
            }
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
                this.getCompetitionStage(year)
            },
            //获取比赛组
            getCompetitionGroups(year) {
                getCompetitionGroups(year).then( response => {
                    this.tableData = response.data.data;
                })

            },
            //获取比赛年
            getCompetitionYear() {
                getAdminCompetition().then(response => {
                    let competitionList =  response.data.data;//管理员维护的比赛列表
                    sessionStorage.setItem('competitionList',JSON.stringify(competitionList));
                    this.sortValue(competitionList,'year')
                    for(let competition of competitionList) {
                        this.competitionYearOptions.push({
                            label: competition.year + '年',
                            value: competition.year
                        })
                    }
                })
            },
            //排序
            sortValue(value, key) {
                value.sort((a, b) => {
                    const data1 = a[key];
                    const data2 = b[key];
                    return data1 - data2;
                })
            },
            //获取比赛阶段信息
            getCompetitionStage(year) {
                const competitionList =  JSON.parse(sessionStorage.getItem('competitionList'));
                for(const competition of competitionList) {
                    if(competition.year === year) {
                        let stages = competition.stages;
                        this.sortValue(stages, 'id');
                        this.stageOptions = [];
                        for(let i=0; i< stages.length; i++) {
                            this.stageOptions.push({
                                value: stages[i].name,
                                label: stages[i].name
                            })
                        }
                        this.stageValue = this.stageOptions[0].label;
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
            //搜索
            searchInfo() {
                if(this.searchKeyValue === 'name') {
                    return this.tableData.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()));
                } else if (this.searchKeyValue === 'captainName') {
                    return this.tableData.filter(data => !this.search || data.captainName.toLowerCase().includes(this.search.toLowerCase()))
                }
            }
        },
        mounted() {
            this.getCompetitionYear();
            this.handleYearChange(this.yearValue);

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
    }


</style>