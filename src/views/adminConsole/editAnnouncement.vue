<template>
    <div id="adminManagement">
        <div>
            <el-select v-model="year"
                       size="medium"
                       placeholder="请选择"
                       style="margin-left: 80px"
                       @change="getAnnouncement">
                <el-option
                        v-for="item in competitionYearOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>

            <el-button type="primary"
                       round
                       class="addAnnouncement pull-right"
                       @click="newAnnouncement = true">
                新增公告
            </el-button>

        </div>
        <div class="div-30"></div>

        <el-tabs v-model="activeName" tab-position="left" type="border-card" id="tabWrap">
            <div v-if="announcementList.length === 0" class="noAnnouncement">暂无公告信息</div>
            <template v-else>
                <el-tab-pane v-for="(item,index) in announcementList"
                             :key="item.id"
                             :label="item.title"
                             class="tabTitle">
                    <div class="title">{{item.title}}</div>

                    <div class="content">
                        {{ item.content }}
                    </div>
                    <div class="buttons">
                        <el-button type="danger" @click="deleteAnnouncement(index)">删除</el-button>
                        <el-button type="success" @click="topping(index)">置顶</el-button>
                    </div>
                </el-tab-pane>
            </template>
        </el-tabs>

        <el-dialog
                title="新增公告"
                :visible.sync="newAnnouncement"
                :show-close="false"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                center>
            <el-form ref="form" :model="creatAnnouncement" label-width="100px">
                <el-form-item label="标题">
                    <el-input v-model="creatAnnouncement.name" placeholder="请输入标题"></el-input>
                </el-form-item>

                <el-form-item label="公告内容">
                    <el-input type="textarea" :rows="10" v-model="creatAnnouncement.content"></el-input>
                </el-form-item>

                <el-form-item label="比赛年份">
                    <el-select v-model="creatAnnouncement.year"
                               size="medium"
                               placeholder="请选择"
                               style="width: 100px;">
                        <el-option
                                v-for="item in competitionYearOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

<!--                <el-form-item label="发送通知">-->
<!--                    <el-switch v-model="creatAnnouncement.sendNotice"></el-switch>-->
<!--                </el-form-item>-->
            </el-form>
            <span slot="footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="addAnnouncement">确 定</el-button>
            </span>
        </el-dialog>

    </div>

</template>

<script>
    import {getBoard} from "@/api/userConsole";
    import {addAnnouncement, deleteAnnouncement, getAdminCompetition, topAnnouncement} from "@/api/adminConsole";
    import format from '@/utils/timeFormat'

    export default {
        name: "editAnnouncement",
        data() {
            return{
                announcementList:[],//公告列表
                competitionValue:'电子商务比赛', //比赛名称
                year:'2020',
                activeName:'',//标签选择项
                newAnnouncement:false,//显示dialog
                creatAnnouncement: {
                    name: '',
                    year: '',
                    content: '',
                    // sendNotice: false,
                },
                competitionYearOptions:[]
            }
        },
        methods:{
            //删除公告
            deleteAnnouncement(index) {
                this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const announcementId = this.announcementList[index].id;
                    deleteAnnouncement(announcementId).then( () => {
                        this.$message({
                            type:'success',
                            message:'删除公告成功！',
                        });
                        this.getAnnouncement();
                    }).catch(error => {
                        this.$message.error(error.response.data)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            //置顶公告
            topping(index) {
                const announcementId = this.announcementList[index].id;
                    topAnnouncement(announcementId).then( () => {
                        this.$message({
                            type:'success',
                            message:'置顶公告成功！',
                        });
                        this.getAnnouncement();
                    }).catch(error => {
                        this.$message.error(error.response.data)
                    })
            },

            //获取公告
            getAnnouncement() {
                this.announcementList = [];
                const data = {year:this.year, competitionName:this.competitionValue};
                getBoard(data).then( response => {
                    this.announcementList = response.data.data;
                }).catch(error => {
                    this.$message.error(error.response.data);
                });
            },

            //新增公告
            addAnnouncement() {
                const data = new FormData();
                data.append('title',this.creatAnnouncement.name);
                data.append('content',this.creatAnnouncement.content);
                data.append('year',this.creatAnnouncement.year);

                const time = format('YYYY-MM-DD');
                data.append('date', time);

                addAnnouncement(data).then(response => {
                    this.$message({
                        type:'success',
                        message:response.data.data,
                    });
                    this.getAnnouncement();
                    this.newAnnouncement = false;
                    this.creatAnnouncement = {
                        name: '',
                        year: '',
                        content: '',
                        // sendNotice: false,
                    };
                }).catch(error => {
                    this.$message.error(error.response.data)
                })
            },

            //取消
            cancel() {
                this.newAnnouncement = false;
                this.creatAnnouncement = {
                        name: '',
                        year: '',
                        content: '',
                    // sendNotice: false,
                };
            },

            //排序
            sortValue(value, key) {
                value.sort((a, b) => {
                    const data1 = a[key];
                    const data2 = b[key];
                    return data1 - data2;
                })
            },

            //获取比赛年
            getCompetitionYear() {
                if(this.competitionYearOptions.length === 0) {
                    getAdminCompetition().then(response => {
                        let competitionList =  response.data.data;//管理员维护的比赛列表
                        this.sortValue(competitionList,'year')
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
        },

        mounted(){
            this.getAnnouncement();
            this.getCompetitionYear();
        }
    }
</script>

<style lang="scss" scoped>
    #adminManagement {
        margin-left: -30px;
        margin-right: -30px;

        #tabWrap {
            height: 85vh;
            width: 100%;

            .noAnnouncement {
                margin-top: 50px;
                font-size: 18px;
                color: #909399;
                text-align: center;
            }

            .title {
                margin-top: 30px;
                font-size: 22px;
                text-align: center;
            }

            .content {
                font-size: 16px;
                padding: 50px;
                height: 50vh;
            }

            .buttons {
                text-align: center;
            }
        }

        .addAnnouncement {
            margin-right: 50px;
            z-index: .5;
        }

        /deep/.el-tabs__item {
            height: 80px;
            width: 250px;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 16px;
            font-family: "幼圆" , serif;
        }

        /deep/.el-tabs--left .el-tabs__item.is-left {
            line-height: 80px;
        }

        /deep/.el-tabs--border-card {
            background: #FFF;
            border: 1px solid #DCDFE6;
            box-shadow: none;
            border-left: none;
            border-right: none;
        }
    }

    @media screen and(max-width: 420px){
        #adminManagement {
            margin-left: -30vw;

            #tabWrap {
                height: 85vh;
                width: 100%;

                .noAnnouncement {
                    margin-top: 50px;
                    font-size: 12px;
                    color: #909399;
                    text-align: center;
                }

                .title {
                    margin-top: 30px;
                    font-size: 16px;
                    text-align: center;
                }

                .content {
                    font-size: 12px;
                    padding: 20px 5px 0 5px;
                    height: 50vh;
                }

                .buttons {
                    text-align: center;
                }
            }

            .addAnnouncement {
                margin-right: 50px;
                z-index: .5;
            }

            /deep/ .el-input__inner{
                width: 30vw;
            }

            /deep/.el-tabs__item {
                height: 40px;
                width: 190px;
                padding: 1vw;
                text-align: right;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 12px;
                font-family: "幼圆" , serif;
            }

            /deep/.el-tabs--left .el-tabs__item.is-left {
                line-height: 30px;
            }

            /deep/.el-tabs--border-card {
                background: #FFF;
                border: 1px solid #DCDFE6;
                box-shadow: none;
                border-left: none;
                border-right: none;
            }

            /deep/.el-button.addAnnouncement{
                position: absolute;
                right: -16vw;
                width: 24vw;
                font-size: 13px;
                color: #fffdef;
            }

            /deep/.el-button.el-button--danger{
                margin-bottom: 3vh;
                margin-left: 2vw;
            }

            /deep/.el-form-item{
                margin-left: -14vw;
            }

            /deep/.el-button.el-button--default{
                margin-bottom: 2vh;
                margin-left: 1.5vw;
            }
        }
    }

</style>
