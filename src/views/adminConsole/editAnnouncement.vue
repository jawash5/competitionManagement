<template>
    <div id="adminManagement">
        <el-tabs v-model="activeName" tab-position="left" type="border-card" id="tabWrap">
<!--                    <el-tab-pane v-for="(item, index) in announcementContent" :key="index" :label="item.name" name="index">-->
<!--                        <announcement announcementName="item.name"></announcement>-->
<!--                    </el-tab-pane>-->
            <el-tab-pane label="公告名">
                <div class="content">
                    <div class="title">{{ announcementContent.title }}</div>
                    <div class="contentWrap">
                        {{ announcementContent.content }}
                    </div>
                </div>
                <div class="buttons">
                    <el-button type="danger" @click="deleteAnnouncement">删除</el-button>
                    <el-button type="success" @click="topping">置顶</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>

        <el-button type="primary"
                   icon="el-icon-plus"
                   circle
                   class="addAnnouncement"
                   @click="newAnnouncement = true">
        </el-button>

        <el-dialog
                title="新增公告"
                :visible.sync="newAnnouncement"
                center>
            <el-form ref="form" :model="creatAnnouncement" label-width="100px">
                <el-form-item label="标题">
                    <el-input v-model="creatAnnouncement.name" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="赛事选择">
                            <el-select v-model="creatAnnouncement.competitionType" placeholder="请选择赛事">
                                <el-option label="赛事一" value="shanghai"></el-option>
                                <el-option label="赛事二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="发布人">
                            <el-input v-model="creatAnnouncement.managerName" placeholder="请输入发布人"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="公告内容">
                    <el-input type="textarea" :rows="10" v-model="creatAnnouncement.context"></el-input>
                </el-form-item>

                <el-form-item label="发送通知">
                    <el-switch v-model="creatAnnouncement.sendNotice"></el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="newAnnouncement = false">取 消</el-button>
                <el-button type="primary" @click="newAnnouncement = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>

</template>

<script>


    export default {
        name: "editAnnouncement",
        data() {
            return{
                activeName:'',//标签选择项
                newAnnouncement:false,//显示dialog
                announcementContent:{
                    id: 7,
                    content: "content content content content content content content content " +
                        "content content content content content content content content content " +
                        "content content content content content content content content content ",
                    managerName: "nmnnmnm",
                    title: "标题",
                    year: "123",
                    competitionName: "python"
                },

                creatAnnouncement: {
                    name: '',
                    competitionType: '',
                    context: '',
                    managerName:'',
                    sendNotice: false,
                }
            }
        },
        methods:{
            deleteAnnouncement:function () {
                console.log('11')
            },
            topping:function () {
                console.log('22')
            }
        }
    }
</script>

<style lang="scss" scoped>
    #tabWrap {
        height: 80vh;
        margin: 0 auto;

        .content {
            margin-top: 30px;
            height: 65vh;

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
        width: 50px;
        height: 50px;
        position: fixed;
        right: 50px;
        bottom: 100px;
        z-index: .5;
    }

    /deep/.el-form-item__content {
        text-align: left;
        line-height: 40px;
        position: relative;
        font-size: 14px;
    }

    /deep/.el-tabs__item {
        width: 150px;
        padding: 0 20px;
        height: 60px;
        box-sizing: border-box;
        line-height: 40px;
        display: inline-block;
        list-style: none;
        font-size: 14px;
        font-weight: 500;
        color: #303133;
        position: relative;
    }

    /deep/.el-tabs__nav .is-left {
        width: 150px;
    }

</style>