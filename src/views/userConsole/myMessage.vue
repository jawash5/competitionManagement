<template>
    <div id="myProject">
        <div>
            <el-select v-model="year"
                       size="medium"
                       placeholder="请选择"
                       style="width: 100px;
                       margin-left: 50px"
                       @change="getAnnouncement">
                <el-option label="2018年" value="2018"></el-option>
                <el-option label="2019年" value="2019"></el-option>
                <el-option label="2020年" value="2020"></el-option>
            </el-select>
        </div>
        <div class="div-15"></div>
        <el-tabs type="border-card" tab-position="left" class="message">
            <el-tab-pane v-for="item in announcementList"
                         :key="item.id"
                         :label="item.title"
                         class="tabTitle">
                <div class="content">
                    {{ item.content }}
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {getBoard} from '@/api/userConsole';
    import {competitionList} from "@/api/login";
    export default {
        name: "myMessage",
        data() {
            return{
                announcementList:[],
                competitionValue:'name', //比赛名称
                competitionList:[], //比赛列表
                year:'2018',
            }
        },

        methods:{
            //获取公告
            getAnnouncement() {
                this.announcementList = [];
                const data = {year:this.year, competitionName:this.competitionValue};
                getBoard(data).then( response => {
                    this.announcementList = response.data.data;
                }).catch(error => {
                    this.$message.error('服务器开小差啦~');
                    console.log(error);
                });
            },

            //获取比赛列表
            getCompetitionList() {
                competitionList().then(response => {
                    const data = response.data.data;
                    for(let i=0; i<data.length; i++) {
                        this.competitionList.push({
                            value: data[i].id,
                            label: data[i].name
                        })
                    }
                })
            },
        },
        mounted(){
            this.getAnnouncement();
            this.getCompetitionList();
        }
    }
</script>

<style lang="scss" scoped>
    #myProject {
        margin: 0 -30px 0 -30px;
    }

    .message {
        width: 100%;
        height: 85vh;
    }

    .content {
        font-size: 16px;
        padding: 50px;
        text-indent:2em;
    }

    /deep/.el-tabs__item {
        font-family: "幼圆" , serif;
        width: 200px;
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

</style>

