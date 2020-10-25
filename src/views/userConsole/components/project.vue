<template>
    <div id="project">
        <div id="projectTop">
            <span class="title2"
                  v-if="projectDetail.competitionInfo.hasOwnProperty('year')">
                {{projectDetail.competitionInfo.year + '年 '}}</span>
            <span class="title2"
                v-if="projectDetail.competitionInfo.hasOwnProperty('session')">
                {{ '第 ' + projectDetail.competitionInfo.session + ' 届'}}</span>
            <div :class="titleClass">{{ projectDetail.competitionInfo.name }}</div>
        </div>
        <el-divider></el-divider>
        <div id="projectBottom">
            <h4 id="teamName">队伍名称：{{ projectDetail.name }}</h4>
            <el-button type="primary" class="checkInfo" @click="editMaterials">查看资料</el-button>
        </div>
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

    #project {
        width: 280px;
        height: 250px;
        margin: 20px;
        border-radius: 15px;
        background-color: #f7f7f7;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    #project:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
        transition: box-shadow 0.3s;
    }

    .competitionName{
        margin-top: 10px;
        padding: 0 2em;
        font-size: 20px;
        color: #303133;
        font-family: "幼圆" , serif;
    }

    .competitionName--long{
        margin-top: 10px;
        padding: 0 2em;
        font-size: 16px;
        color: #303133;
        font-family: "幼圆" , serif;
    }

    .title2 {
        margin-top: 10px;
        color: #303133;
        font-size: 16px;
        font-family: "幼圆" , serif;
    }

    #projectTop {
        margin-top: 20px;
        text-align: center;
    }

    #projectBottom {
        height: 150px;
        margin: 0 40px 20px 40px;
        text-align: center;
    }

    #teamName {
        color: #303133;
        font-size: 16px;
        font-weight: 500;
    }

    .checkInfo {
        margin: 20px 0 0 0;
        display: block;
        width: 100%;
    }

    @media screen and (max-width: 420px){

        #project {
            margin: 0;
            width: 40vw;
            height: 180px;
            border-radius: 15px;
            background-color: #f7f7f7;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
        }

        .competitionName{
            font-size: 10px;
            color: #303133;
            font-family: "幼圆" , serif;
            margin-top: 5px;
        }

        .title2 {
            margin-top: 5px;
            color: #303133;
            font-size: 9px;
            font-family: "幼圆" , serif;
        }

        #projectTop {
            margin-top: 10px;
            padding: 0 10px;
            text-align: center;
        }

        #projectBottom {
            height: 75px;
            margin: 0 20px 10px 20px;
            text-align: center;
        }

        #teamName {
            color: #303133;
            font-size: 8px;
            font-weight: 500;
        }


    }

</style>
