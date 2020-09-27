<template>
    <div id="adminManagement">
        <div>
            <el-select v-model="year"
                       size="medium"
                       placeholder="请选择"
                       style="margin-left: 100px"
                       @change="getAnnouncement">
                <el-option label="2018年" value="2018"></el-option>
                <el-option label="2019年" value="2019"></el-option>
                <el-option label="2020年" value="2020"></el-option>
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
            <el-tab-pane v-for="(item,index) in announcementList"
                         :key="item.id"
                         :label="item.title"
                         class="tabTitle">
                <div class="content">
                    {{ item.content }}
                </div>
                <div class="buttons">
                    <el-button type="danger" @click="deleteAnnouncement(index)">删除</el-button>
                    <el-button type="success" @click="topping(index)">置顶</el-button>
                </div>
            </el-tab-pane>
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
                        <el-option label="2018年" value="2018"></el-option>
                        <el-option label="2019年" value="2019"></el-option>
                        <el-option label="2020年" value="2020"></el-option>
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
    import {addAnnouncement, deleteAnnouncement, topAnnouncement} from "@/api/adminConsole";

    export default {
        name: "editAnnouncement",
        data() {
            return{
                announcementList:[
                    {
                        "id": '',
                        "content": '',
                        "title": '',
                        "year": '',
                        "isTop": '',
                    }
                ],//公告列表
                competitionValue:'电子商务比赛', //比赛名称
                competitionList:[], //比赛列表
                year:'2018',
                activeName:'',//标签选择项
                newAnnouncement:false,//显示dialog
                creatAnnouncement: {
                    name: '',
                    year: '',
                    content: '',
                    // sendNotice: false,
                }
            }
        },
        methods:{
            //删除公告
            deleteAnnouncement(index) {
                const announcementId = this.announcementList[index].id;
                // eslint-disable-next-line no-unused-vars
                deleteAnnouncement(announcementId).then( response => {
                    this.$message({
                        type:'success',
                        message:'删除公告成功！',
                    });
                    this.getAnnouncement();
                }).catch(error => {
                    this.$message.error(error.response.data)
                })
            },

            //置顶公告
            topping(index) {
                const announcementId = this.announcementList[index].id;
                    // eslint-disable-next-line no-unused-vars
                    topAnnouncement(announcementId).then( response => {
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
                    // for (let i=0; i<this.announcementList.length; i++) {
                    //     if(this.announcementList[i].title.length > 7) {
                    //         this.announcementList[i].title.split("").splice(7, 0,"\n");
                    //         // this.announcementList[i].title.join();
                    //         console.log(this.announcementList[i].title)
                    //     }
                    // }
                }).catch(error => {
                    this.$message.error('服务器开小差啦~');
                    console.log(error);
                });
            },

            //新增公告
            addAnnouncement() {
                const data = new FormData();
                data.append('title',this.creatAnnouncement.name);
                data.append('content',this.creatAnnouncement.content);
                data.append('year',this.creatAnnouncement.year);

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
            }
        },

        mounted(){
            this.getAnnouncement();
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

            .content {
                font-size: 16px;
                padding: 50px;
                text-indent:2em;
                height: 50vh;

                .title {
                    font-family: "幼圆" , serif;
                    font-size: 22px;
                    text-align: center;
                }

                .contentWrap{
                    margin-top: 50px;
                    font-size: 16px;
                    text-indent: 2em;
                    line-height: 2em;
                }
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
            font-family: "幼圆" , serif;
            /*width: 200px;*/
            height: 80px;
            font-size: 16px;
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
</style>