<template>
    <div id="teamManagement">
        <el-form>
            <el-row>
                <el-col :span="12">
                    <el-form-item>
                        <el-select v-model="competitionValue" placeholder="请选择比赛阶段" size="small">
                            <el-option
                                    v-for="item in competitionOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                        <el-select v-model="yearValue"
                                   placeholder="比赛年份"
                                   size="small"
                                   style="width: 100px;margin-left: 20px"
                                   @change="getCompetitionGroups">
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
                                   style="width: 120px;line-height: 40px">
                            <el-option
                                    v-for="item in searchOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input placeholder="请输入搜索内容" size="small" style="width: 130px; margin-left: 10px"></el-input>
                        <el-button type="danger" size="mini" style="margin-left: 10px">搜索</el-button>
                    </el-form-item>

                </el-col>
            </el-row>
        </el-form>

        <el-table
                ref="multipleTable"
                :data="tableData"
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
                    <span>{{ tableData[scope.$index].captain.name }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="mail"
                    label="队伍邮箱"
                    width="250"
                    align="center"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{ tableData[scope.$index].captain.email }}</span>
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
                <template>
                    <el-button
                            size="mini"
                            @click="handleEdit()"
                            >编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
                title="修改资料"
                :visible.sync="dialogVisible"
                center
                width="50%">
            <div style="margin: 0 50px">
                <el-form ref="editForm" :model="editForm" label-width="80px">
                    <el-row gutter="20">
                        <el-col span="12">
                            <el-form-item label="队伍序号">
                                <el-input v-model="editForm.teamID"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col span="12">
                            <el-form-item label="队长姓名">
                                <el-input v-model="editForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="项目名称">
                        <el-input v-model="editForm.projectName"></el-input>
                    </el-form-item>

                    <el-row gutter="20">
                        <el-col span="12">
                            <el-form-item label="队伍名称">
                                <el-input v-model="editForm.teamName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col span="12">
                            <el-form-item label="队伍邮箱">
                                <el-input v-model="editForm.mail"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="上交情况">
                        <el-checkbox v-for="item in editForm.isSubmit"
                                     :key="item.id"
                                     v-model="item.state">{{item.name}}</el-checkbox>
                    </el-form-item>

                    <el-form-item label="晋级情况">
                        <el-checkbox v-for="item in editForm.isPromote"
                                     :key="item.id"
                                     v-model="item.state">{{item.name}}</el-checkbox>
                    </el-form-item>

                    <el-form-item label="角色管理">
                        <el-radio v-for="item in editForm.authority"
                                  :key="item.id"
                                  v-model="editForm.role" :label="item.id">{{item.role}}</el-radio>
                    </el-form-item>

                    <el-form-item label="作品审核">
                        <el-switch v-model="editForm.projectCheck"></el-switch>
                    </el-form-item>

                </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEditForm">确 定</el-button>
            </span>
        </el-dialog>

        <div class="div-30"></div>
        <el-row>
            <el-col :span="12">
                <el-button size="medium">批量删除</el-button>
                <el-button size="medium">修改权限</el-button>
                <el-button size="medium">下载信息</el-button>
                <el-button size="medium" @click="sendNotice()">发送通知</el-button>
                <el-button size="medium">文件下载</el-button>
                <el-button size="medium">成绩添加</el-button>
            </el-col>
            <el-col :span="12">

            </el-col>
        </el-row>

        <send-message :visible="sendMessageVisible" @dialogClose="dialogClose"></send-message>

    </div>

</template>

<script>
    import {getRoles, getAdminCompetition, getCompetitionGroups} from "@/api/adminConsole";
    import sendMessage from "@/views/adminConsole/components/sendMessage";

    export default {
        name: "teamManagement",
        components:{sendMessage},
        data() {
            return {
                currentPage:1,//当前页码
                currentSize:7,//当前条数
                dialogVisible:false, //编辑对话框
                //比赛阶段选项
                competitionOptions: [],
                //比赛选择值
                competitionValue: '',
                //比赛年份选项
                competitionYearOptions: [
                    {value: '2018', label: '2018年'},
                    {value: '2019', label: '2019年'},
                    {value: '2020', label: '2020年'},
                ],
                //比赛年份
                yearValue:'2019',
                //关键词选项
                searchOptions: [
                    { value: 'name', label: '项目名称' },
                    { value: 'captainName', label: '队长姓名' },
                    { value: '队伍名称', label: '队伍名称' },
                    { value: '队伍邮箱', label: '队伍邮箱' },
                ],
                //关键词
                searchKeyValue: '',
                //管理员维护的比赛列表
                AdminCompetition:[],

                //表单参数
                tableData: [],
                //修改信息表单参数
                editForm:{
                    teamID:'',
                    name:'',
                    teamName:'',
                    projectName:'',
                    mail:'',
                    role:'',
                    isSubmit:{
                        first: {state:true, name:'初赛'},
                        second:{state:false, name:'复赛'},
                        third:{state:false, name:'决赛'}
                    },
                    isPromote:{
                        first: {state:true, name:'初赛'},
                        second:{state:false, name:'复赛'},
                        third:{state:false, name:'决赛'}
                    },
                    authority:[],//用户权限角色
                    projectCheck:false,
                },
                sendMessageVisible:false,//发送通知对话框
                chosenGroups:[],//左侧多选数组
            };
        },
        computed: {
          total (){
              return this.tableData.length;
            }
        },
        methods: {
            //编辑
            handleEdit() {
                this.dialogVisible = true;
            },

            //获取该管理员维护的比赛列表
            getAdminCompetition() {
                getAdminCompetition().then( response => {
                    const adminCompetition = response.data.data;
                    for(let i=0; i<adminCompetition.length; i++) {
                        this.competitionOptions.push({
                            value: adminCompetition[i].id,
                            label: adminCompetition[i].id
                        })
                    }
                }).catch( error => {
                    this.$message.error(error.response.data)
                })
            },

            //获取比赛组
            getCompetitionGroups(year) {
                getCompetitionGroups(year).then( response => {
                    this.tableData = response.data.data
                }).catch( error => {
                    this.$message.error(error.response.data)
                })
            },

            //提交修改表单
            submitEditForm() {

            },
            // handleConform:function (index) {
            //     this.tableData[index].isSet = false;
            // },
            // handleCancel:function (index) {
            //     this.tableData[index].isSet = false;
            // }

            //获取权限角色
            getRoles() {
                getRoles().then(response => {
                    this.editForm.authority = response.data.data;
                }).catch( error => {
                        this.$message.error(error.response.message);
                })
            },

            //发送通知
            sendNotice() {
                this.sendMessageVisible = true;
                this.$store.commit('sendNotice/SET_CHOSEN_GROUPS', this.chosenGroups)

            },
            //关闭通知
            dialogClose() {
                this.sendMessageVisible = false;
            },
            //左侧多选选中事件
            handleChange(selection) {
                this.chosenGroups = selection;
            },
            // //搜索
            // search() {
            //     const keyValue = this.searchKeyValue;
            //     this.formData.filter(data  => data.)
            // }
        },
        mounted() {
            this.getRoles();
            this.getAdminCompetition();
            this.getCompetitionGroups(this.yearValue)
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