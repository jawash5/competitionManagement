<template>
    <div class="project">
        <div :class="titleClass">{{ projectDetail.competitionInfo.name }}</div>
        <el-divider></el-divider>
        <div class="titleName" v-if="projectDetail.competitionInfo.hasOwnProperty('year')">举办年份：
            <span class="content" >
            {{projectDetail.competitionInfo.year + '年 '}}</span>
        </div>

        <div class="titleName" v-if="projectDetail.competitionInfo.hasOwnProperty('session')">比赛届数：
            <span class="content">
            {{ projectDetail.competitionInfo.session + ' 届'}}</span>
        </div>

        <div class="titleName">队伍名称：{{ projectDetail.name }}</div>

        <el-button type="primary" class="checkInfo" @click="editMaterials">查看资料</el-button>

    </div>
</template>

<script>

    export default {
        name: "project",
        props:{
            projectDetail: {
                type:Object,
                require:true,
                default: () => {
                    return {
                        id: '',
                        name: '',
                        competitionInfo:{
                            session: '',
                            year:'',
                            name:''
                        }
                    }
                }
            }
        },
        data() {
            return {
            }
        },
        computed:{
            titleClass() {
                if (this.projectDetail.competitionInfo.name.length > 10) {
                    return 'competitionName--long';
                } else {
                    return 'competitionName'
                }
            }
        },
        methods:{
            //点击编辑后事件
            editMaterials() {
                this.$store.dispatch('group/setGroupId', this.projectDetail.id)
                this.$router.push({
                    path: "/editProject",
                });
            },
        },

    }
</script>

<style lang="scss" scoped>

    .project {
        position: relative;
        width: 220px;
        height: 210px;
        margin: 20px calc((100% - 4 * 260px) / 8);
        padding: 20px;
        border-radius: 15px;
        background-color: #f7f7f7;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

        &:hover{
            box-shadow: 0 0 10px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
            transition: box-shadow 0.3s;
        }

        .competitionName{
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            height: 2em;
            width: 220px;
            padding: 0 1em;
            font-size: 20px;
            color: #303133;
        }

        .competitionName--long{
            height: 2em;
            padding: 0 1em;
            text-align: center;
            font-size: 18px;
            color: #303133;
        }

        .titleName {
            display: inline-block;
            margin-top: 10px;
            color: #606266;
            font-size: 14px;

            &:last-of-type {
                font-size: 16px;
                color: #303133;
                line-height: 1.2em;
            }

            &:after {
                content: '';
                display: block;
                height: 0;
                overflow: hidden;
            }
        }

        .content {
            color: #606266;
            font-size: 14px;
        }

        .el-divider--horizontal {
            margin: 18px 0;
        }

        .checkInfo {
            position: absolute;
            bottom: 20px;
            left: 10%;
            margin: 20px 0 0 0;
            display: block;
            width: 80%;
        }
    }

    @media screen and (max-width: 1450px){
        .project {
            margin: 20px calc((100% - 3 * 260px) / 6);
        }
    }

    @media screen and (max-width: 1200px){
        .project {
            margin: 20px calc((100% - 2 * 260px) / 4);
        }
    }

    /*@media screen and (max-width: 900px){*/
    /*    .project {*/
    /*        margin: 20px calc((100% - 1 * 260px) / 2);*/
    /*    }*/
    /*}*/

</style>
